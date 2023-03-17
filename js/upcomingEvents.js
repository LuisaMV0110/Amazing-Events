const { createApp } = Vue;

const app = createApp( {
    data(){
        return{
            eventsUpcoming : undefined,
            categories : undefined,
            currentDate : undefined,
            valueSearch : '',
            checked : [],
            filterEvents : [],
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then( ( { events, currentDate } ) => {
            this.currentDate = currentDate
            this.eventsUpcoming = events.filter(event0 => event0.date > this.currentDate)
            this.categories = [...new Set(events.filter(event0 => event0.category).map(event0 => event0.category))]
            this.filterEvents = events.filter(event0 => event0.date > this.currentDate)
        })
        .catch(err => console.log(err))

    },
    methods:{
        filter(){
            this.filterEvents = this.eventsUpcoming.filter( event0 => {
                return event0.name.toLowerCase().includes(this.valueSearch.toLowerCase())
                && (this.checked.includes(event0.category) || this.checked.length == 0)
            })
        },
    },
})
app.mount('#app')