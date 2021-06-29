const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    
    async index(req,res) {

        const jobs = await Job.get();
        const profile = await Profile.get();

        const statusCount = {
            progress: 0,
            
            done: 0,

            total: jobs.length,
        }

        let totalDailyHours = 0

        const updatedJobs = jobs.map((job) => { 
            // ajustes no job
            const remaining = JobUtils.remainingDaysFlex(job)
            const status = remaining <= 0 ? 'done' : 'progress';
            statusCount[status]++

            totalDailyHours += status === 'progress' ? Number(job["daily-hours"]) : 0;
            
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculeteBudget(job, profile["value-hour"]),
                
            }

        }) 
        

        const freeHours = profile["hours-per-day"] - totalDailyHours 
        
        return res.render("index", { profile: profile , jobs: updatedJobs, statusCount: statusCount, freeHours: freeHours })

    }
}