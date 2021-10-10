const knex = require('../database/connection')

class StatisticsController{
    async homeStatistics(req, res){

        const months = {
            1: 'Janeiro',
            2: 'Fevereiro',
            3: 'Março',
            4: 'Abril',
            5: 'Maio',
            6: 'Junho',
            7: 'Julho',
            8: 'Agosto',
            9: 'Setembro',
            10: 'Outubro',
            11: 'Novembro',
            12: 'Dezembro'
        }

        const { rows: chartData } = await knex.raw(`
            select 
                count(id) as amount, 
                sum(total) as total, 
                extract(month from date_trunc('month', orders.created_at)) as month
            from orders 
            group by date_trunc('month', orders.created_at)
            order by month`)

        const chart = chartData.map(info => { 
            info.month = months[info.month]
            return info
        })

        const dateDiary = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().substr(0, 10)

        const { rows: diarySoldAmount } = await knex.raw(`
            select
                sum(total)
            from orders
            where date_trunc('day', orders.created_at) = '${dateDiary}'
            group by date_trunc('day', orders.created_at)
        `)

        const dateMonthlySales = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000))
        dateMonthlySales.setDate(dateMonthlySales.getDate() - dateMonthlySales.getDate())

        const { rows: monthlySoldAmount } = await knex.raw(`
            select
                sum(total) as total
            from orders
            where date_trunc('month', orders.created_at) = '${dateMonthlySales.toISOString().substr(0, 10)}'
            group by date_trunc('month', orders.created_at)
        `)

        const { rows: monthlySales } = await knex.raw(`
            select
                count(id)
            from orders
            where date_trunc('month', orders.created_at) = '${dateMonthlySales.toISOString().substr(0, 10)}'
            group by date_trunc('month', orders.created_at)
        `)

        const { rows: diarySales } = await knex.raw(`
            select
                count(id)
            from orders
            where date_trunc('day', orders.created_at) = '${dateDiary}'
            group by date_trunc('day', orders.created_at)
        `)

        const statitistics = {
            chart: {
                months: chart.map(info => info.month),
                totals: chart.map(info => info.total),
                amounts: chart.map(info => parseInt(info.amount))
            },
            diarySoldAmount: diarySoldAmount.length > 0 ? diarySoldAmount : 0,
            monthlySoldAmount: monthlySoldAmount.length > 0 ? monthlySoldAmount[0].total : 0,
            monthlySales: monthlySales.length > 0 ? monthlySales[0].count : 0,
            diarySales: diarySales.length > 0 ? diarySales: 0
        }

        return res.json(statitistics)
    }
}

module.exports = new StatisticsController()