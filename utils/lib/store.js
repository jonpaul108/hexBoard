import PubSub from './pubSub.js';

export default class Store {
    construcotr(params) {
        let self = this;
        self.actions = {};
        self.mutations = {};
        self.state = {};
        self.status = 'resting';
        self.events = new PubSub();
    }
}