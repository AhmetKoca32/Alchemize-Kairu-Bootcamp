#!/usr/bin/env python3
"""
GitHub Repository Fetcher - Kullanıcının GitHub repolarını çeker
Gereksinimler: pip install PyGithub python-dotenv
Kullanim: GITHUB_TOKEN=your_token python github_repo_fetcher.py
"""

import os
import sys
import time
from datetime import datetime
from github import Github, GithubException, RateLimitExceededException, UnknownObjectException, BadCredentialsException
from dotenv import load_dotenv

# .env dosyasini yukle (hata durumunda sessizce devam et)
try:
    load_dotenv()
except Exception:
    pass  # .env dosyasi yoksa veya hataliysa devam et


def get_github_client():
    """GitHub token ile guvenli baglanti kurar"""
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        print("Hata: GITHUB_TOKEN ortam degiskeni ayarli degil.", file=sys.stderr)
        print("Cozum: export GITHUB_TOKEN=your_token", file=sys.stderr)
        sys.exit(1)
    
    try:
        g = Github(token, per_page=50)
        # Token gecerliligini test et
        g.get_user()
        print("GitHub baglantisi basarili")
        return g
    except BadCredentialsException:
        print("Gecersiz GitHub token", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"GitHub baglanti hatasi: {e}", file=sys.stderr)
        sys.exit(1)


def wait_for_rate_limit(g):
    """Rate limit kontrolu ve bekleme"""
    try:
        rl = g.get_rate_limit()
        core = rl.core
        
        if core.remaining > 10:  # Guvenli marj
            return
        
        reset_time = core.reset.replace(tzinfo=None)
        now = datetime.utcnow()
        sleep_seconds = (reset_time - now).total_seconds()
        
        if sleep_seconds > 0:
            print(f"Rate limit: {sleep_seconds:.0f} saniye bekleniyor...")
            time.sleep(min(sleep_seconds, 60))
    except Exception as e:
        print(f"Rate limit kontrolu hatasi: {e}")


def analyze_repository_technologies(g, repo):
    """Repository'deki teknolojileri detayli analiz eder"""
    try:
        wait_for_rate_limit(g)
        
        # 1. Dil analizi (tum diller ve yuzdeleri)
        languages = {}
        try:
            languages = repo.get_languages()
        except Exception:
            languages = {repo.language: 100} if repo.language else {}
        
        # 2. Topics/etiketler
        topics = []
        try:
            topics = repo.get_topics()
        except Exception:
            pass
        
        # 3. Dosya yapisi analizi
        tech_stack = {
            'languages': languages,
            'frameworks': [],
            'databases': [],
            'devops': [],
            'dependencies': {},
            'topics': topics
        }
        
        # 4. Package manager dosyalarini tara
        try:
            contents = repo.get_contents("")
            for content in contents:
                if content.name in ['requirements.txt', 'package.json', 'pom.xml', 'Gemfile', 'composer.json', 'pubspec.yaml']:
                    try:
                        file_content = content.decoded_content.decode('utf-8')
                        dependencies = parse_dependencies(content.name, file_content)
                        tech_stack['dependencies'].update(dependencies)
                    except Exception:
                        pass
        except Exception:
            pass
        
        # 5. Framework tespiti
        tech_stack['frameworks'] = detect_frameworks(tech_stack['languages'], tech_stack['dependencies'])
        
        return tech_stack
        
    except Exception as e:
        print(f"Teknoloji analizi hatasi ({repo.name}): {e}")
        return {
            'languages': {repo.language: 100} if repo.language else {},
            'frameworks': [],
            'databases': [],
            'devops': [],
            'dependencies': {},
            'topics': []
        }


def parse_dependencies(filename, content):
    """Package manager dosyalarindan bagimliliklari cikarir"""
    dependencies = {}
    
    try:
        if filename == 'requirements.txt':
            for line in content.split('\n'):
                line = line.strip()
                if line and not line.startswith('#'):
                    package = line.split('==')[0].split('>=')[0].split('<=')[0]
                    dependencies[package.lower()] = True
        
        elif filename == 'package.json':
            import json
            data = json.loads(content)
            deps = data.get('dependencies', {})
            dev_deps = data.get('devDependencies', {})
            for dep in {**deps, **dev_deps}:
                dependencies[dep.lower()] = True
        
        elif filename == 'pom.xml':
            # Basit XML parsing (gercek projede lxml kullanilabilir)
            if 'spring-boot' in content.lower():
                dependencies['spring-boot'] = True
            if 'hibernate' in content.lower():
                dependencies['hibernate'] = True
        
        elif filename == 'Gemfile':
            for line in content.split('\n'):
                line = line.strip()
                if line.startswith('gem '):
                    gem = line.split('gem ')[1].split("'")[1].split('"')[1]
                    dependencies[gem.lower()] = True
        
        elif filename == 'pubspec.yaml':
            # Flutter/Dart pubspec.yaml parsing
            import yaml
            try:
                data = yaml.safe_load(content)
                deps = data.get('dependencies', {})
                dev_deps = data.get('dev_dependencies', {})
                for dep in {**deps, **dev_deps}:
                    dependencies[dep.lower()] = True
            except Exception:
                # Basit text parsing fallback
                for line in content.split('\n'):
                    line = line.strip()
                    if ':' in line and not line.startswith('#') and not line.startswith('name:') and not line.startswith('version:'):
                        dep = line.split(':')[0].strip()
                        if dep and dep not in ['dependencies', 'dev_dependencies']:
                            dependencies[dep.lower()] = True
                    
    except Exception:
        pass
    
    return dependencies


def detect_frameworks(languages, dependencies):
    """Dil ve bagimlilik bilgilerinden framework'leri tespit eder"""
    frameworks = []
    
    # Python frameworks
    if 'python' in languages or any('python' in dep for dep in dependencies):
        if 'django' in dependencies:
            frameworks.append('Django')
        if 'flask' in dependencies:
            frameworks.append('Flask')
        if 'fastapi' in dependencies:
            frameworks.append('FastAPI')
        if 'pandas' in dependencies:
            frameworks.append('Pandas')
        if 'numpy' in dependencies:
            frameworks.append('NumPy')
    
    # JavaScript frameworks
    if 'javascript' in languages or any('javascript' in dep for dep in dependencies):
        if 'react' in dependencies:
            frameworks.append('React')
        if 'vue' in dependencies:
            frameworks.append('Vue.js')
        if 'angular' in dependencies:
            frameworks.append('Angular')
        if 'express' in dependencies:
            frameworks.append('Express.js')
        if 'node' in dependencies:
            frameworks.append('Node.js')
    
    # Flutter/Dart frameworks
    if 'dart' in languages or any('dart' in dep for dep in dependencies):
        if 'flutter' in dependencies:
            frameworks.append('Flutter')
        if 'dart' in dependencies:
            frameworks.append('Dart')
    
    # Java frameworks
    if 'java' in languages:
        if 'spring-boot' in dependencies:
            frameworks.append('Spring Boot')
        if 'hibernate' in dependencies:
            frameworks.append('Hibernate')
    
    # Database detection
    databases = []
    if 'postgresql' in dependencies or 'psycopg2' in dependencies:
        databases.append('PostgreSQL')
    if 'mysql' in dependencies or 'pymysql' in dependencies:
        databases.append('MySQL')
    if 'mongodb' in dependencies or 'pymongo' in dependencies:
        databases.append('MongoDB')
    if 'redis' in dependencies:
        databases.append('Redis')
    
    return frameworks


def fetch_user_repositories(g, username):
    """Kullanicinin public depolarini ceker ve detayli bilgi dondurur"""
    print(f"\n{username} kullanicisinin depolari cekiliyor...")
    print("-" * 60)
    
    repositories = []
    
    try:
        wait_for_rate_limit(g)
        user = g.get_user(username)
        
        repos = user.get_repos(type="public", sort="updated")
        count = 0
        
        for repo in repos:
            if count >= 50:  # Maksimum 50 repo
                break
                
            # Temel repo bilgileri
            repo_data = {
                'name': repo.name,
                'full_name': repo.full_name,
                'description': repo.description,
                'language': repo.language,
                'stargazers_count': repo.stargazers_count,
                'forks_count': repo.forks_count,
                'updated_at': repo.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
                'created_at': repo.created_at.strftime('%Y-%m-%d'),
                'html_url': repo.html_url,
                'clone_url': repo.clone_url,
                'size': repo.size,
                'topics': repo.get_topics() if hasattr(repo, 'get_topics') else []
            }
            
            # Teknoloji analizi
            tech_stack = analyze_repository_technologies(g, repo)
            repo_data['tech_stack'] = tech_stack
            
            repositories.append(repo_data)
            
            print(f"Repo: {repo.full_name}")
            print(f"   Dil: {repo.language or 'Belirtilmemis'}")
            print(f"   Yildiz: {repo.stargazers_count}")
            print(f"   Fork: {repo.forks_count}")
            print(f"   Guncelleme: {repo.updated_at.strftime('%Y-%m-%d')}")
            print(f"   Teknolojiler: {', '.join(tech_stack['frameworks'])}")
            print()
            count += 1
            
        print(f"Toplam {count} depo cekildi")
        return repositories
        
    except UnknownObjectException:
        print(f"Kullanici bulunamadi: {username}")
        return []
    except RateLimitExceededException:
        print("Rate limit asildi, lutfen daha sonra deneyin")
        return []
    except Exception as e:
        print(f"Depo cekme hatasi: {e}")
        return []


def analyze_repositories(repositories):
    """Repository verilerini analiz eder ve istatistikler dondurur"""
    if not repositories:
        return {}
    
    # Dil analizi
    languages = {}
    total_stars = 0
    total_forks = 0
    
    for repo in repositories:
        lang = repo['language'] or 'Belirtilmemis'
        languages[lang] = languages.get(lang, 0) + 1
        total_stars += repo['stargazers_count']
        total_forks += repo['forks_count']
    
    # En populer dil
    most_used_language = max(languages.items(), key=lambda x: x[1])[0] if languages else 'Belirtilmemis'
    
    # En populer repo
    most_starred = max(repositories, key=lambda x: x['stargazers_count']) if repositories else None
    
    analysis = {
        'total_repos': len(repositories),
        'total_stars': total_stars,
        'total_forks': total_forks,
        'languages': languages,
        'most_used_language': most_used_language,
        'most_starred_repo': most_starred['full_name'] if most_starred else None,
        'most_starred_count': most_starred['stargazers_count'] if most_starred else 0
    }
    
    return analysis


def match_repos_to_job_posting(repositories, job_requirements):
    """İş ilanına göre en uygun projeleri bulur ve CV için öneriler sunar"""
    matching_repos = []
    
    for repo in repositories:
        score = 0
        matched_techs = []
        relevance_reasons = []
        tech_stack = repo.get('tech_stack', {})
        
        # Her teknoloji için puan ver
        for required_tech in job_requirements:
            required_tech_lower = required_tech.lower()
            
            # Dil eşleşmesi (3 puan)
            for lang in tech_stack.get('languages', {}):
                if required_tech_lower in lang.lower():
                    score += 3
                    matched_techs.append(f"Language: {lang}")
                    relevance_reasons.append(f"{lang} programlama dili kullanılmış")
                    break
            
            # Framework eşleşmesi (2 puan)
            for framework in tech_stack.get('frameworks', []):
                if required_tech_lower in framework.lower():
                    score += 2
                    matched_techs.append(f"Framework: {framework}")
                    relevance_reasons.append(f"{framework} framework'ü kullanılmış")
                    break
            
            # Dependency eşleşmesi (1 puan)
            for dep in tech_stack.get('dependencies', {}):
                if required_tech_lower in dep.lower():
                    score += 1
                    matched_techs.append(f"Dependency: {dep}")
                    relevance_reasons.append(f"{dep} kütüphanesi kullanılmış")
                    break
        
        # Proje kalitesi puanı (yıldız sayısına göre)
        quality_bonus = min(repo['stargazers_count'] * 0.1, 2)  # Maksimum 2 puan bonus
        score += quality_bonus
        
        # Güncellik puanı (son güncelleme tarihine göre)
        from datetime import datetime
        try:
            updated_date = datetime.strptime(repo['updated_at'], '%Y-%m-%d %H:%M:%S')
            days_ago = (datetime.now() - updated_date).days
            if days_ago < 30:
                score += 1  # Son 30 gün içinde güncellenmiş
                relevance_reasons.append("Son 30 gün içinde güncellenmiş")
            elif days_ago < 90:
                score += 0.5  # Son 3 ay içinde güncellenmiş
                relevance_reasons.append("Son 3 ay içinde güncellenmiş")
        except:
            pass
        
        if score > 0:
            matching_repos.append({
                'repo': repo,
                'match_score': round(score, 1),
                'matched_technologies': matched_techs,
                'relevance_reasons': relevance_reasons,
                'tech_stack': tech_stack,
                'cv_recommendation': generate_cv_recommendation(repo, matched_techs, relevance_reasons)
            })
    
    # Puanına göre sırala
    return sorted(matching_repos, key=lambda x: x['match_score'], reverse=True)


def generate_cv_recommendation(repo, matched_techs, relevance_reasons):
    """Proje için CV önerisi oluşturur"""
    recommendations = []
    
    # Proje açıklaması
    if repo.get('description'):
        recommendations.append(f"Proje Açıklaması: {repo['description']}")
    
    # Teknoloji vurgusu
    if matched_techs:
        tech_list = [tech.split(': ')[1] for tech in matched_techs]
        recommendations.append(f"Kullanılan Teknolojiler: {', '.join(tech_list)}")
    
    # Proje kalitesi
    if repo['stargazers_count'] > 10:
        recommendations.append(f"Popüler Proje: {repo['stargazers_count']} yıldız")
    
    # Güncellik
    if "Son 30 gün içinde güncellenmiş" in relevance_reasons:
        recommendations.append("Aktif Geliştirme: Son 30 gün içinde güncellenmiş")
    
    return recommendations


def print_analysis(analysis):
    """Analiz sonuclarini yazdirir"""
    print("\n" + "=" * 60)
    print("REPOSITORY ANALIZI")
    print("=" * 60)
    
    print(f"Toplam Repository: {analysis['total_repos']}")
    print(f"Toplam Yildiz: {analysis['total_stars']}")
    print(f"Toplam Fork: {analysis['total_forks']}")
    print(f"En Cok Kullanilan Dil: {analysis['most_used_language']}")
    
    if analysis['most_starred_repo']:
        print(f"En Populer Repo: {analysis['most_starred_repo']} ({analysis['most_starred_count']} yildiz)")
    
    print("\nDil Dagilimi:")
    for lang, count in sorted(analysis['languages'].items(), key=lambda x: x[1], reverse=True):
        print(f"  {lang}: {count} repo")


def print_job_matching(matching_repos, job_requirements):
    """İş ilanı eşleştirme sonuçlarını ve CV önerilerini yazdırır"""
    print("\n" + "=" * 60)
    print("İŞ İLANI EŞLEŞTİRME VE CV ÖNERİLERİ")
    print("=" * 60)
    print(f"Aranan Teknolojiler: {', '.join(job_requirements)}")
    print(f"Eşleşen Repository Sayısı: {len(matching_repos)}")
    print()
    
    for i, match in enumerate(matching_repos[:5], 1):  # İlk 5 sonuç
        repo = match['repo']
        print(f"{i}. {repo['full_name']} (Skor: {match['match_score']})")
        print(f"   Açıklama: {repo['description'] or 'Açıklama yok'}")
        print(f"   Yıldız: {repo['stargazers_count']}")
        print(f"   Eşleşen Teknolojiler: {', '.join(match['matched_technologies'])}")
        print(f"   URL: {repo['html_url']}")
        
        # CV önerileri
        print("   📝 CV Önerileri:")
        for rec in match['cv_recommendation']:
            print(f"      • {rec}")
        print()


def main():
    """Ana fonksiyon - GitHub repository verilerini ceker ve analiz eder"""
    print("GitHub Repository Fetcher Baslatiliyor...")
    print("=" * 60)
    
    # GitHub baglantisi
    g = get_github_client()
    
    # Token sahibinin kendi bilgilerini al
    current_user = g.get_user()
    username = current_user.login  # Token sahibinin kullanici adi
    
    try:
        # Repository verilerini cek
        repositories = fetch_user_repositories(g, username)
        
        if repositories:
            # Verileri analiz et
            analysis = analyze_repositories(repositories)
            
            # Analiz sonuclarini yazdir
            print_analysis(analysis)
            
            # İş ilanı eşleştirme örneği
            job_requirements = ['python', 'fastapi', 'postgresql', 'docker', 'flutter']
            matching_repos = match_repos_to_job_posting(repositories, job_requirements)
            print_job_matching(matching_repos, job_requirements)
            
            # Ham veriyi JSON olarak kaydet (opsiyonel)
            import json
            with open(f'{username}_repositories.json', 'w', encoding='utf-8') as f:
                json.dump({
                    'user': username,
                    'fetched_at': datetime.now().isoformat(),
                    'repositories': repositories,
                    'analysis': analysis,
                    'job_matching': {
                        'requirements': job_requirements,
                        'matching_repos': matching_repos
                    }
                }, f, ensure_ascii=False, indent=2)
            
            print(f"\nDetayli veriler {username}_repositories.json dosyasina kaydedildi")
        
        print("\nIslem tamamlandi!")
        
    except KeyboardInterrupt:
        print("\nIslem kullanici tarafindan durduruldu")
    except Exception as e:
        print(f"\nBeklenmeyen hata: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
