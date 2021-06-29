const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
        
    async save(req, res) {


        Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            "created-at": Date.now()      // Atribuindo data de hoje
        })
        

        return res.redirect('/')
    },

    create(req, res) {
       return res.render("job")
    },

    async show(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))
        
        if (!job) {
            return res.send('Job not found!')
        }
        
        job.budget = JobUtils.calculeteBudget(job, profile["value-hour"])
    

        return res.render("job-edit", { job })
    },

    async update(req, res) {
        const jobId = req.params.id
        const jobs = await Job.get()
        
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        const updatedJobs = {
            ...job,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"]
        }
        
        await Job.update(updatedJobs, jobId)
        
        res.redirect('/job/' + jobId)
    },

    async delete(req, res) {
        const jobId = req.params.id

        await Job.delete(jobId)

        return res.redirect('/')
    }
}
