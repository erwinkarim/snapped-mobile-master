import Repository from "@/repositories/Repository";


export default {
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {

        googleClassroom({state, commit, getters, dispatch}) {

            const newWindow = openWindow('', 'message')

            Repository.post(process.env.VUE_APP_GOOGLE_CLASSROOM)
                .then(response => {
                    newWindow.location.href = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },

        googleClassroomCallback({state, commit, getters, dispatch}, code) {

            let payload = {
                code: code
            }

            Repository.post(process.env.VUE_APP_GOOGLE_CLASSROOM_CALLBACK, payload)
                .then(response => {
                    console.log('received from backend callback')
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.error(error);
                });
        }

    },
    getters: {}
}


/**
 *   Opens a popup window to load Laravel Socialite redirect pages via URL
 **/
function openWindow(url, title, options = {}) {
    if (typeof url === 'object') {
        options = url
        url = ''
    }

    options = {url, title, width: 600, height: 720, ...options}

    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
    const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
    const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height

    options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
    options.top = ((height / 2) - (options.height / 2)) + dualScreenTop

    const optionsStr = Object.keys(options).reduce((acc, key) => {
        acc.push(`${key}=${options[key]}`)
        return acc
    }, []).join(',')

    const newWindow = window.open(url, title, optionsStr)

    if (window.focus) {
        newWindow.focus()
    }

    return newWindow
}
