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
            
            repositories.append(repo_data)
            
            print(f"Repo: {repo.full_name}")
            print(f"   Dil: {repo.language or 'Belirtilmemis'}")
            print(f"   Yildiz: {repo.stargazers_count}")
            print(f"   Fork: {repo.forks_count}")
            print(f"   Guncelleme: {repo.updated_at.strftime('%Y-%m-%d')}")
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
            
            # Ham veriyi JSON olarak kaydet (opsiyonel)
            import json
            with open(f'{username}_repositories.json', 'w', encoding='utf-8') as f:
                json.dump({
                    'user': username,
                    'fetched_at': datetime.now().isoformat(),
                    'repositories': repositories,
                    'analysis': analysis
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
