module.exports = {
    remainingDaysFlex(job) {
        // Cálculo dos dias restantes        
        const remainingDays = (job['total-hours']/job['daily-hours']).toFixed()

        const createdDate = new Date(job["created-at"])

        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()

        // Convertendo 1 Day in Milliseconds
        const dayInMs = 1000 * 60 * 60 * 24

        const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        // restam x dias
        return dayDiff
    },

    calculeteBudget: (job, valueHour) => valueHour * job["total-hours"]
}