const { createApp } = Vue;

const app = createApp( {
    data(){
        return{
            events : [],
            categories : [],
            valueSearch : '',
            checked : [],
            filterEvents : []

        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then( ( { events } ) => {
            this.events = events
            this.filterEvents = events
            this.categories = [...new Set(events.filter(event0 => event0.category).map(event0 => event0.category))]
        })
        .catch(err => console.log(err))

    },
    methods:{
        filter(){
            let filterSearch = this.events.filter(event0 => event0.name.toLowerCase().includes(this.valueSearch.toLowerCase()))
            let filterChecks = filterSearch.filter(event0 => this.checked.includes(event0.category) || this.checked.length == 0)
            this.filterEvents = filterChecks
        },
    },
})
app.mount('#app')