
import { observable, action, toJS } from 'mobx'
import { AsyncStorage } from 'react-native';
import { persist } from 'mobx-persist'
import api from '../api'
import utils from '../utils'

export default class AppStore {
    /////////////////////////////////////////////////////////////////// REQUESTS

    @persist('list') @observable requests = []
    @persist('list') @observable sent = []
    @persist('list') @observable drafts = []
    @persist('list') @observable requestIds = []
    @persist('object') @observable currentRequest = {}
    @persist('list') @observable currentMedia = []

    @action getRequests() {
        return new Promise (async (resolve, reject) => {
            try {
                console.log('getting requests')
                const res = await api.getRequests()
                const { all, sent, drafts } = processRequests(res.data)
                console.log(`got requests: { all: ${all.length}, sent: ${sent.length}, drafts: ${drafts.length} }`)
                this.requests = all
                this.sent = sent
                this.drafts = drafts
                this.requestIds = all.map(r => r.id)

                // remove media items if necessary
                const ids = toJS(this.requestIds)
                Object.keys(this.media).forEach(key => {
                    if (!ids.includes(key)) {
                        delete this.media[key]
                    }
                })
                console.log(`${Object.keys(this.media).length} media items`)

                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    @action setCurrentRequest(request, media) {
        return new Promise (async (resolve, reject) => {
            try {
                if (!request) {
                    request = {
                        id: -1,
                        attributes: {
                            title: '',
                            description: '',
                            delivery_country: null,
                            quantity: null,
                            target_price: null
                        }
                    }
                }

                this.currentRequest = request
                this.currentMedia = media ? [ media ] : []
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    @action saveRequest(request) {
        return new Promise (async (resolve, reject) => {
            try {
                delete request.attributes.sent_at
                request.attributes.quantity = utils.parseNumber(request.attributes.quantity)
                request.attributes.target_price = utils.parseNumber(request.attributes.target_price)

                Object.keys(request.attributes).forEach(key => {
                    if (key !== 'title' && !request.attributes[key]) {
                    delete request.attributes[key]
                    }
                })

                let saved_request

                if (request.id === -1) {
                    saved_request = await api.saveRequest(request.attributes)
                }
                else {
                    delete request.attributes.created_at
                    delete request.attributes.updated_at
                    saved_request = await api.updateRequest(request.id, request.attributes)
                }
                console.log('====')
                if (!saved_request || !saved_request.data || !saved_request.data.id) {
                    reject(saved_request)
                    return
                }
                console.log(saved_request)

                resolve(saved_request.data.id)
            }
            catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }

    @action sendRequest(request) {
        return new Promise (async (resolve, reject) => {
            try {
                await api.sendRequest(request.id)
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    @action deleteRequest(id) {
        return new Promise (async (resolve, reject) => {
            try {
                console.log(`deleting request: ${id}`)
                await api.deleteRequest(id)
                delete this.media[id]
                console.log('deleted')
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    /////////////////////////////////////////////////////////////////// MEDIA

    @persist('object') @observable media = {}

    @action getUserMedia() {
        return new Promise (async (resolve, reject) => {
            try {
                const res = await api.getUserMedia()

                const media = {}
                res.data.forEach(m => {
                    const request_id = m.attributes.request_id
                    if (!media[request_id]) {
                        media[request_id] = []
                    }

                    media[request_id].push(m)
                })

                this.media = { ...media }
                resolve()
            }
            catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }

    @action getMediaLinks() {
        return new Promise (async (resolve, reject) => {
            try {
                await utils.asyncForEach(this.requestIds, async (id) => {
                    const requestMedia = await api.getMediaLinks(id)
                    if (requestMedia && requestMedia.data) {
                        this.media[id] = requestMedia.data
                    }

                    console.log(`${Object.keys(this.media).length} / ${this.requestIds.length}`)
                    await delay()
                })
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    @action getMediaLink(id) {
        return new Promise (async (resolve, reject) => {
            try {
                const res = await api.getMediaLinks(id)
                this.media[id] = res.data
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    @action createMedia(attributes) {
        return new Promise (async (resolve, reject) => {
            try {
                const res = await api.createMedia(attributes)
                resolve(res.data)
            }
            catch (e) {
                reject(e)
            }
        })
    }

    @action deleteMedia(media) {
        return new Promise (async (resolve, reject) => {
            try {
                await api.deleteMedia(media.id)
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    /////////////////////////////////////////////////////////////////// AUTH

    @persist('object') @observable auth = {}

    @action createUser({ name, email, password }) {
        return new Promise (async (resolve, reject) => {
            try {
                await api.createUser({name, email, password})
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })
    }

    @action login(email, password) {
        return new Promise (async (resolve, reject) => {
            try {
                const res = await api.login(email, password)
                resolve(res)
            }
            catch (e) {
                reject(e)
            }
        })
    }

    @action saveAuthCredentials(creds) {
        this.auth = creds
    }

    @action resetPassword(email) {
        return new Promise (async (resolve, reject) => {
            try {
                const res = await api.resetPassword(email)
                resolve(res)
            }
            catch (e) {
                reject(e)
            }
        })
    }

    /////////////////////////////////////////////////////////////////// USER

    @persist('object') @observable user = {}

    @action getUser(auth) {
        return new Promise (async (resolve, reject) => {
            try {
                const res = await api.getUser(auth.user_id, auth.token)
                this.user = res
                resolve(res)
            }
            catch (e) {
                reject(e)
            }
        })
    }


    /////////////////////////////////////////////////////////////////// DEVICE

    @persist('object') @observable deviceIsIphoneX = false

    @action setDeviceIsIphoneX(bool) {
        this.deviceIsIphoneX = bool
    }
}

/////////////////////////////////////////////////////////////////// HELPER FUNCTIONS

const delay = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 500)
    })
}

const sortByDate = (a, b) => {
    if (a.attributes.updated_at < b.attributes.updated_at) {
        return 1
    }
    return -1
}

const processRequests = (requests) => {
    const all = requests.sort(sortByDate)
    const drafts = all.filter(r => !r.attributes.sent_at)
    const sent = all.filter(r => r.attributes.sent_at)
    return { all, drafts, sent }
}
