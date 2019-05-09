const mix = require('laravel-mix');

mix.js('js/backend.js', 'dist')
   .setPublicPath('dist');