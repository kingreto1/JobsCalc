const Database = require('../db/config')



module.exports = {
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)
        
        await db.close()

        return jobs.map(job => {
            return {
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                "created-at": job.created_at
            }
        })
        
    },

    async update(newJob, id) {
        const db = await Database()

        if(Number(newJob.id) === Number(id)) {
            await db.run(`UPDATE jobs SET
            name = "${newJob.name}",
            daily_hours = ${newJob["daily-hours"]},
            total_hours = ${newJob["total-hours"]},
            created_at = ${newJob["created-at"]} WHERE id = ${id}    
            `)
        }


        await db.close()
    },

    async delete(id) {
       const db = await Database()

       await db.run(`DELETE FROM jobs where id = ${id}`)

       await db.close()
    },

    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob["created-at"]}
        )`)
        
        await db.close()
    }
}