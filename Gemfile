source "https://rubygems.org"

gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-sitemap", "~> 1.4"
end

# Needed by `jekyll serve` on Ruby 3+
gem "webrick", "~> 1.8"

# Windows does not ship zoneinfo files
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
