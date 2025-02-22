module github.com/zetxek/adritian-demo

go 1.23

require github.com/zetxek/adritian-free-hugo-theme v1.6.1
//replace github.com/zetxek/adritian-free-hugo-theme => github.com/zetxek/adritian-free-hugo-theme 150870e0ef4d1c3c8615464aba13cdf467ba90f4

// for local development
replace github.com/zetxek/adritian-free-hugo-theme => ../adritian-free-hugo-theme
