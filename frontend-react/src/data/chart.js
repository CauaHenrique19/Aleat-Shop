const color = '#E7A117'
const secondaryColor = '#2B9E74'

const OptionsChart = {
    colors: [color, secondaryColor],
    chart: {
        height: 500,
        type: "area",
        toolbar: {
            show: false
        },
        foreColor: "#EEEEEE",
        zoom: {
            enabled: false
        },
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        style: {
            fontSize: '16px',
            fontFamily: 'Roboto'
        },
        x: {
            show: false
        },
        theme: "dark"
    },
    fill: {
        type: "gradient",
        opacity: 0.3,
        gradient: {
            shade: "dark",
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
        },
    },
    grid: {
        show: false
    },
    legend: {
        fontSize: '16px',
        fontFamily: 'Roboto',
        onItemClick: {
            toggleDataSeries: false
        },
    },
    xaxis: {
        categories: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ],
        tooltip: {
            enabled: false,
        },
        labels: {
            style: {
                fontSize: '16px',
                fontFamily: 'Roboto',
            },
        },
        axisBorder: {
            show: true,
            height: 2,
            color: color
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            style: {
                fontSize: '16px',
                fontFamily: 'Roboto',
            }
        },
        axisBorder: {
            show: true,
            width: 2,
            color: color
        },
    },
    stroke: {
        width: 2,
    }
}

const Series = [
    {
        name: "Lucro",
        data: [10, 50, 84, 48, 50, 80, 40, 47, 91, 100, 145, 25],
        foreColor: "#EEEEEE"
    },
    {
        name: "Vendas",
        data: [0, 37, 44, 28, 10, 45, 8, 20, 14, 20, 35, 0],
        foreColor: "#EEEEEE"
    },
]

export { OptionsChart, Series }