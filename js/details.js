const {createApp} = Vue;

const app = createApp({
    data() {
        return {
            params: '',
            idEvents: '',
            id: '',
            change: '',
        };
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(events => {
                this.params = new URLSearchParams(location.search);
                this.id = this.params.get('id');
                this.idEvents = events.events.find(event0 => event0._id == this.id);
                this.change = this.idEvents.estimate ? 'Estimate: ' + this.idEvents.estimate : 'Assistance: ' + this.idEvents.assistance;
            })
            .catch(error => console.log(error));
    },
});

app.mount('#app')