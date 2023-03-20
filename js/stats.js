const{ createApp } = Vue

createApp({
    data(){
        return {
            events: [],
            largerCapacity: {},
            lowestAttendance: {},
            highestAttendance: {},
            upcomingStats: [],
            pastStats : [],
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(events => {
            this.events = events.events
            this.createGeneralStats()
            this.createCategoryStats(this.events.filter(event0 => event0.estimate), this.upcomingStats)
            this.createCategoryStats(this.events.filter(event0 => event0.assistance), this.pastStats)
            
        })
        .catch(error => console.log(error))
    },
    methods: {
        accumulator(eventList){
            let accum = {'revenues': 0, 'percentArray': [], 'percent': 0}
            let totalPercent = 0
            let count = 0;

            eventList.forEach(event0 => {
                accum.revenues += (event0.estimate ? event0.estimate : event0.assistance) * event0.price;
                accum.percentArray.push(((event0.estimate ? event0.estimate : event0.assistance) * 100 / event0.capacity));

                totalPercent += accum.percentArray[count];
                count ++;
            });
            accum.percent = Number(totalPercent / accum.percentArray.length).toFixed(1);
            return accum;
        },
        createCategoryStats: function (events, container){
            let setCategory = Array.from(new Set (events.map(event0 => event0.category).sort()))
            setCategory.forEach(category => {
                let categoryStats = this.accumulator(events.filter(event0 => event0.category === category))
                categoryStats.name = category
                container.push(categoryStats)
            } )
        },
        createGeneralStats: function(){
            this.largerCapacity = this.events.sort((event1,event2) => event2.capacity - event1.capacity)[0]
            this.events.forEach(event0 => event0.percent = Number(event0.assistance * 100 / event0.capacity).toFixed(1))
            let eventsAttendancePercent = this.events.filter(event0 => event0.assistance).sort((event1,event2) => event1.percent - event2.percent)
            this.lowestAttendance = eventsAttendancePercent[0]
            this.highestAttendance = eventsAttendancePercent[eventsAttendancePercent.length - 1]
        }
    }
})
.mount('#app')
