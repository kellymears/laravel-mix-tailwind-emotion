const mix = require('laravel-mix')

class TailwindEmotion {
  name() {
    return 'tweemotional'
  }

  dependencies() {
    this.requiresReload = `
      Dependencies have been installed. Please run again.
    `

    return [
      'emotion',
      '@emotion/core',
      '@emotion/styled',
      '@emotion/babel-preset-css-prop',
      'babel-plugin-emotion',
      'babel-plugin-macros',
      'tailwind.macro',
      'tailwindcss',
    ]
  }

  register(options) {
    this.config = {
      tailwind: options && options.tailwindConfig ?
                options.tailwindConfig :
                'tailwind.config.js',

      emotionFormat: options && options.emotionFormat ?
                     options.emotionFormat
                     : '[local]',
    }
  }

  babelConfig() {
    return {
      presets: [['@emotion/babel-preset-css-prop', {
        autoLabel: true,
        labelFormat: this.config.emotionFormat,
      }]],
      plugins: [
        ['macros', {
          config: this.config.tailwind,
          format: 'auto',
        }],
        ['emotion', {
          autoLabel: true,
          labelFormat: this.config.emotionFormat,
        }],
      ],
    }
  }
}

mix.extend('tweemotional', new TailwindEmotion())
