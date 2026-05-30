# Auto-injects your GitHub token into the Site Generator page
# Run this to open the site with your token pre-filled

$token = gh auth token 2>$null
if (-not $token) {
  Write-Host "❌ GitHub token not found. Run 'gh auth login' first." -ForegroundColor Red
  exit 1
}

$url = "https://ilyasigma111.github.io/site-generator/#token=$token"
Write-Host "🚀 Opening Site Generator with your token..." -ForegroundColor Green
Start-Process $url
