const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        return res.render( "profile", { profile: await Profile.get() })
    },

    async update(req, res) {
        const profile = await Profile.get()
        // req.body para puxar os dados
        const data = req.body
        // quantidade de semanas num ano
        const weeksPerYear = 52

        // média de semanas disponíveis num mês menos as férias
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        // horas trabalhadas na semana
        const hoursPerWeek = data["hours-per-day"] * data["days-per-week"]

        // horas trabalhadas no mês
        const monthlyHours = hoursPerWeek * weeksPerMonth

        // Custo do serviço por hora
        const valueHour = data["monthly-budget"] / monthlyHours

        await Profile.update({
            ...profile,
            ...data,
            "value-hour": valueHour
        })        
        
        return res.redirect('/profile')
    }
}