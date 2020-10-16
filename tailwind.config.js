module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [
        './public/**/*.html',
        './src/**/*.vue'
    ],
    theme: {
        extend: {
            fontSize: {
                '2xs': '0.5rem',
                'xs-plus': '0.8125rem',
                'md': '1.075rem',
                'px-10': '10px',
                'px-11': '11px',
                'px-12': '12px',
                'px-13': '13px',
                'px-14': '14px',
                'px-15': '15px'
            },
            fontFamily: {
                'display': ['sf-pro', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                'xl': '0.75rem',
                '2xl': '1rem'
            },
            borderWidth: {
                '1/4': '0.25px',
                '1/2': '0.5px',
                '3/4' : '0.75px',
                '1': '1px'
            },
            height: {
                '14': '3.5rem',
                '18': '4.5rem',
                '28': '7rem',
                '30': '7.5rem',
                '44': '11rem',
                '46': '11.5rem'
            },
            colors: {
                'gray-secondary': '#F1F3F6',
                'purple-primary': '#3A4276',
                'purple-secondary': '#7B7F9E',
                'yellow-primary': '#FDB400'
            }
        },
    },
    variants: {},
    plugins: [],
}
