import * as CanvasJS from "../utils/canvasjs.min";
import {AttachMoneyOutlined, FlightOutlined, HomeOutlined, RestaurantOutlined} from "@material-ui/icons";
import {earnedCategories, spentCategories} from "./categories";

CanvasJS.addCultureInfo("pt", {
    decimalSeparator: ",",
    digitGroupSeparator: ".",
    printText: "Imprimir",
    resetText: "Restabelecer",
    savePNGText: "Guardar PNG",
    saveJPGText: "Guardar JPG",
    menuText: "Mais opções",
    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
});

let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

let lineColors = ["red", "green", "blue", "yellow"];

const spendings2018 = {
    title: "Despesas em 2018",
    date: "20 de novembro de 2018",
    chart: {
        exportEnabled: true,
        exportFileName: "despesas2018",
        animationEnabled: true,
        animationDuration: 1250,
        theme: "dark2",
        backgroundColor: "#424242",
        culture: "pt",
        zoomEnabled: true,
        panEnabled: true,
        title: {
            text: "Despesas em 2018",
            fontFamily: "Helvetica",
            margin: 10
        },
        subtitles: [
            {
                text: "Desde 1 de janeiro de 2018",
                fontColor: "grey",
                fontSize: 11
            },
            {
                text: "até 20 de novembro de 2017",
                fontColor: "grey",
                fontSize: 11,
                margin: 20
            }
        ],
        legend: {
            fontWeight: "normal",
        },
        data: [{
            type: "pie",
            showInLegend: true,
            fontColor: "#fff",
            indexLabel: "{y}% {label}",
            legendText: "{label}",
            indexLabelFontColor: "white",
            toolTipContent: "{label}: <strong>{y} %</strong>",
            dataPoints: [
                {label: "Casa", y: 31.9, color: spentCategories.get("Casa").color},
                {label: "Impostos", y: 9.2, color: spentCategories.get("Impostos").color},
                {label: "Restauração", y: 10.1, color: spentCategories.get("Restauração").color},
                {label: "Transporte", y: 10.6, color: spentCategories.get("Transporte").color},
                {label: "Educação", y: 14.0, color: spentCategories.get("Educação").color},
                {label: "Saúde", y: 12.0, color: spentCategories.get("Saúde").color},
                {label: "Férias", y: 4.0, color: spentCategories.get("Férias").color},
                {label: "Diversão", y: 3.1, color: spentCategories.get("Diversão").color},
                {label: "Animais de Estimação", y: 4.1, color: spentCategories.get("Animais de Estimação").color}
            ]
        }]
    },
    thumbnail: {
        exportEnabled: false,
        animationEnabled: true,
        animationDuration: 1750,
        theme: "dark2",
        backgroundColor: "#424242",
        culture: "pt",
        height: 175,
        data: [{
            type: "pie",
            showInLegend: false,
            fontColor: "#fff",
            toolTipContent: "{label}: <strong>{y} %</strong>",
            indexLabel: "{y} %",
            indexLabelPlacement: "inside",
            indexLabelFontColor: "white",
            dataPoints: [
                {label: "Casa", y: 31.9, color: spentCategories.get("Casa").color},
                {label: "Impostos", y: 9.2, color: spentCategories.get("Impostos").color},
                {label: "Restauração", y: 10.1, color: spentCategories.get("Restauração").color},
                {label: "Transporte", y: 10.6, color: spentCategories.get("Transporte").color},
                {label: "Educação", y: 14.0, color: spentCategories.get("Educação").color},
                {label: "Saúde", y: 12.0, color: spentCategories.get("Saúde").color},
                {label: "Férias", y: 4.0, color: spentCategories.get("Férias").color},
                {label: "Diversão", y: 3.6, color: spentCategories.get("Diversão").color},
                {label: "Animais de Estimação", y: 4.6, color: spentCategories.get("Animais de Estimação").color}
            ]
        }]
    }
};

export const monthlySpending2017 = {
    title: "Despesas mensais de 2017",
    date: "15 de abril de 2018",
    chart: {
        exportEnabled: true,
        exportFileName: "despesasMensais2017",
        animationEnabled: true,
        animationDuration: 1250,
        theme: "dark2",
        backgroundColor: "#424242",
        culture: "pt",
        zoomEnabled: true,
        panEnabled: true,
        title: {
            text: "Despesas mensais de 2017",
            fontFamily: "Helvetica",
            margin: 10
        },
        subtitles:[
            {
                text: "Desde 1 de janeiro de 2017",
                fontColor: "grey",
                fontSize: 11
            },
            {
                text: "até 31 de dezembro de 2017",
                fontColor: "grey",
                fontSize: 11,
                margin: 20
            }
        ],
        legend: {
            fontWeight: "normal",
        },
        axisX: {
            title: "Meses",
            valueFormatString: "MMM",
        },
        axisY: {
            title: "Despesas (em €)",
            minimum: 500
        },
        data: [{
            type: "spline",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,### €",
            dataPoints: [
                { label: "Janeiro", y: 556 },
                { label: "Fevereiro", y: 602 },
                { label: "Março", y: 983 },
                { label: "Abril", y: 895 },
                { label: "Maio", y: 984 },
                { label: "Junho", y: 840 },
                { label: "Julho", y: 750 },
                { label: "Agosto", y: 1212 },
                { label: "Setembro", y: 920 },
                { label: "Outubro", y: 760 },
                { label: "Novembro", y: 775 },
                { label: "Dezembro", y: 1201 },
            ]
        }]
    },
    thumbnail: {
        exportEnabled: false,
        animationEnabled: true,
        animationDuration: 1750,
        theme: "dark2",
        backgroundColor: "#424242",
        culture: "pt",
        height: 175,
        axisY: {
            minimum: 500,
            maximum: 1300,
            interval: 100
        },
        data: [{
            type: "spline",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,### €",
            dataPoints: [
                { label: "Jan", y: 556 },
                { label: "Fev", y: 602 },
                { label: "Mar", y: 983 },
                { label: "Abr", y: 895 },
                { label: "Mai", y: 984 },
                { label: "Jun", y: 840 },
                { label: "Jul", y: 750 },
                { label: "Ago", y: 1212 },
                { label: "Set", y: 920 },
                { label: "Out", y: 760 },
                { label: "Nov", y: 775 },
                { label: "Dez", y: 1201 },
            ]
        }]
    }
};


export const spendingsMarch2018 = {
    title: "Despesas em março de 2018",
    date: "10 de abril de 2018",
    chart: {
        exportEnabled: true,
        exportFileName: "depesasMarco2018",
        animationEnabled: true,
        animationDuration: 1250,
        theme: "dark2",
        backgroundColor: "#424242",
        culture: "pt",
        zoomEnabled: true,
        panEnabled: true,
        title: {
            text: "Despesas em março de 2018",
            fontFamily: "Helvetica",
            margin: 10
        },
        legend: {
            fontWeight: "normal",
        },
        subtitles:[
            {
                text: "Desde 1 de março de 2018",
                fontColor: "grey",
                fontSize: 11
            },
            {
                text: "até 31 de março de 2018",
                fontColor: "grey",
                fontSize: 11,
                margin: 20
            }
        ],
        data: [{
            type: "pie",
            showInLegend: true,
            fontColor: "#fff",
            indexLabel: "{y}% {label}",
            legendText: "{label}",
            indexLabelFontColor: "white",
            toolTipContent: "{label}: <strong>{y} %</strong>",
            dataPoints: [
                { label: "Casa", y: 49.3, color: spentCategories.get("Casa").color},
                { label: "Impostos", y: 3.2, color: spentCategories.get("Impostos").color},
                { label: "Restauração", y: 3.6, color: spentCategories.get("Restauração").color},
                { label: "Transporte", y: 15.6, color: spentCategories.get("Transporte").color},
                { label: "Educação", y: 12.0, color: spentCategories.get("Educação").color},
                { label: "Saúde", y: 12.2, color: spentCategories.get("Saúde").color},
                { label: "Animais de Estimação", y: 4.1, color: spentCategories.get("Animais de Estimação").color},
            ]
        }]
    },
    thumbnail: {
        exportEnabled: false,
        animationEnabled: true,
        animationDuration: 1750,
        theme: "dark2",
        backgroundColor: "#424242",
        culture: "pt",
        height: 175,
        data: [{
            type: "pie",
            showInLegend: false,
            fontColor: "#fff",
            toolTipContent: "{label}: <strong>{y} %</strong>",
            indexLabel: "{y} %",
            indexLabelPlacement: "inside",
            indexLabelFontColor: "white",
            dataPoints: [
                { label: "Casa", y: 49.3, color: spentCategories.get("Casa").color},
                { label: "Impostos", y: 3.2, color: spentCategories.get("Impostos").color},
                { label: "Restauração", y: 3.6, color: spentCategories.get("Restauração").color},
                { label: "Transporte", y: 15.6, color: spentCategories.get("Transporte").color},
                { label: "Educação", y: 12.0, color: spentCategories.get("Educação").color},
                { label: "Saúde", y: 12.2, color: spentCategories.get("Saúde").color},
                { label: "Animais de Estimação", y: 4.1, color: spentCategories.get("Animais de Estimação").color},
            ]
        }]
    }
};


export const gainingsComparation20162017 = {
    title: "Receitas 2016 vs 2017",
    date: "5 de janeiro 2018",
    chart: {
        exportEnabled: true,
        exportFileName: "gainingsComparation20162017",
        animationEnabled: true,
        animationDuration: 1250,
        theme: "dark2",
        backgroundColor: "#424242",
        culture: "pt",
        zoomEnabled: true,
        panEnabled: true,
        title: {
            text: "Receitas 2016 vs 2017",
            fontFamily: "Helvetica",
            margin: 10
        },
        subtitles:[
            {
                text: "Desde 1 de janeiro de 2016",
                fontColor: "grey",
                fontSize: 11
            },
            {
                text: "até 31 de dezembro de 2017",
                fontColor: "grey",
                fontSize: 11,
                margin: 20
            }
        ],
        toolTip: {
            shared: true
        },
        axisY : {
            title: "Receitas (€)",
            minimum: 700
        },
        ticks: {
            title: "Meses",
            autoSkip: false
        },
        data: [
            {
                type: "spline",
                name: "2016",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,### €",
                dataPoints: [
                    { label: "Janeiro", y: 940.3},
                    { label: "Fevereiro", y: 1103.9},
                    { label: "Março", y: 811.3},
                    { label: "Abril", y: 1105.1},
                    { label: "Maio", y: 906.7},
                    { label: "Junho", y: 986.5},
                    { label: "Julho", y: 1002.8},
                    { label: "Agosto", y: 1202.3},
                    { label: "Setembro", y: 940.9},
                    { label: "Outubro", y: 930.1},
                    { label: "Novembro", y: 998.1},
                    { label: "Dezembro", y: 1102.1}
                ]
            },
            {
                type: "spline",
                name: "2017",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,### €",
                dataPoints: [
                    { label: "Janeiro", y: 1103.1},
                    { label: "Fevereiro", y: 1020.5},
                    { label: "Março", y: 790.3},
                    { label: "Abril", y: 1020.1},
                    { label: "Maio", y: 1212.7},
                    { label: "Junho", y: 923.4},
                    { label: "Julho", y: 1203.3},
                    { label: "Agosto", y: 904.1},
                    { label: "Setembro", y: 1130.4},
                    { label: "Outubro", y: 1023.1},
                    { label: "Novembro", y: 864.1},
                    { label: "Dezembro", y: 934.7}
                ]
            }
        ]
    },
    thumbnail: {
        exportEnabled: false,
        animationEnabled: true,
        animationDuration: 1750,
        theme: "dark2",
        backgroundColor: "#424242",
        culture: "pt",
        height: 175,
        axisY: {
            maximum: 1300,
            minimum: 700,
            interval: 100,
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                type: "spline",
                name: "2016",
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,### €",
                dataPoints: [
                    { label: "Jan", y: 940.3},
                    { label: "Fev", y: 1103.9},
                    { label: "Mar", y: 811.3},
                    { label: "Abr", y: 1105.1},
                    { label: "Mai", y: 906.7},
                    { label: "Jun", y: 986.5},
                    { label: "Jul", y: 1002.8},
                    { label: "Ago", y: 1202.3},
                    { label: "Set", y: 940.9},
                    { label: "Out", y: 930.1},
                    { label: "Nov", y: 998.1},
                    { label: "Dez", y: 1102.1}
                ]
            },
            {
                type: "spline",
                name: "2017",
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,### €",
                dataPoints: [
                    { label: "Jan", y: 1103.1},
                    { label: "Fev", y: 1020.5},
                    { label: "Mar", y: 790.3},
                    { label: "Abr", y: 1020.1},
                    { label: "Mai", y: 1212.7},
                    { label: "Jun", y: 923.4},
                    { label: "Jul", y: 1203.3},
                    { label: "Ago", y: 904.1},
                    { label: "Set", y: 1130.4},
                    { label: "Out", y: 1023.1},
                    { label: "Nov", y: 864.1},
                    { label: "Dez", y: 934.7}
                ]
            }
        ]
    }
};

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function progressThroughTimeChartTemplate(title, categoryType, initialDate, finalDate, dataAggregation) {
    let jan = randomIntFromInterval(500, 800);
    let fev = randomIntFromInterval(600, 1000);
    let mar = randomIntFromInterval(600, 900);
    let abr = randomIntFromInterval(800, 1250);
    let mai = randomIntFromInterval(600, 1000);
    let jun = randomIntFromInterval(700, 1000);
    let jul = randomIntFromInterval(650, 1000);
    let ago = randomIntFromInterval(1000, 1200);
    let set = randomIntFromInterval(600, 1000);
    let out = randomIntFromInterval(600, 1000);
    let nov = randomIntFromInterval(600, 1000);
    let dez = randomIntFromInterval(1250, 1300);
    return {
        title: title,
        date: new Date().toLocaleDateString('pt', dateOptions),
        chart: {
            exportEnabled: true,
            exportFileName: title.replace(/ /g, ''),
            animationEnabled: true,
            animationDuration: 1250,
            theme: "dark2",
            backgroundColor: "#424242",
            culture: "pt",
            zoomEnabled: true,
            panEnabled: true,
            title: {
                text: title,
                fontFamily: "Helvetica",
                margin: 10
            },
            subtitles:[
                {
                    text: "Desde " + new Date(initialDate).toLocaleDateString('pt', dateOptions),
                    fontColor: "grey",
                    fontSize: 11
                },
                {
                    text: "até " + new Date(finalDate).toLocaleDateString('pt', dateOptions),
                    fontColor: "grey",
                    fontSize: 11,
                    margin: 20
                }
            ],
            legend: {
                fontWeight: "normal",
            },
            axisX: {
                title: "Meses",
                valueFormatString: "MMM",
            },
            axisY: {
                title: "Despesas (em €)",
                minimum: Math.min(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez) - 100,
            },
            data: [{
                type: "spline",
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,### €",
                dataPoints: [
                    { label: "Janeiro", y: jan},
                    { label: "Fevereiro", y: fev},
                    { label: "Março", y: mar},
                    { label: "Abril", y: abr},
                    { label: "Maio", y: mai},
                    { label: "Junho", y: jun},
                    { label: "Julho", y: jul},
                    { label: "Agosto", y: ago},
                    { label: "Setembro", y: set},
                    { label: "Outubro", y: out},
                    { label: "Novembro", y: nov},
                    { label: "Dezembro", y: dez},
                ]
            }]
        },
        thumbnail: {
            exportEnabled: false,
            animationEnabled: true,
            animationDuration: 1750,
            theme: "dark2",
            backgroundColor: "#424242",
            culture: "pt",
            height: 175,
            axisY: {
                minimum: Math.min(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez) - 100,
                maximum: Math.max(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez) + 100,
                interval: 100
            },
            data: [{
                type: "spline",
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,### €",
                dataPoints: [
                    { label: "Jan", y: jan },
                    { label: "Fev", y: fev },
                    { label: "Mar", y: mar },
                    { label: "Abr", y: abr },
                    { label: "Mai", y: mai },
                    { label: "Jun", y: jun },
                    { label: "Jul", y: jul },
                    { label: "Ago", y: ago },
                    { label: "Set", y: set },
                    { label: "Out", y: out },
                    { label: "Nov", y: nov },
                    { label: "Dez", y: dez },
                ]
            }]
        }
    };
}

export function categoryThroughTimeChartTemplate(title, categoryType, category, initialDate, finalDate, dataAggregation) {
    let categoryInfo = categoryType === "Receita" ? earnedCategories.get(category) : spentCategories.get(category);
    let jan = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let fev = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let mar = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let abr = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let mai = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let jun = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let jul = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let ago = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let set = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let out = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let nov = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    let dez = randomIntFromInterval(500, 1000) * categoryInfo.weight;
    return {
        title: title,
        date: new Date().toLocaleDateString('pt', dateOptions),
        chart: {
            exportEnabled: true,
            exportFileName: title.replace(/ /g, ''),
            animationEnabled: true,
            animationDuration: 1250,
            theme: "dark2",
            backgroundColor: "#424242",
            culture: "pt",
            zoomEnabled: true,
            panEnabled: true,
            title: {
                text: title,
                fontFamily: "Helvetica",
                margin: 10
            },
            subtitles:[
                {
                    text: "Desde " + new Date(initialDate).toLocaleDateString('pt', dateOptions),
                    fontColor: "grey",
                    fontSize: 11
                },
                {
                    text: "até " + new Date(finalDate).toLocaleDateString('pt', dateOptions),
                    fontColor: "grey",
                    fontSize: 11,
                    margin: 20
                }
            ],
            legend: {
                fontWeight: "normal",
            },
            axisX: {
                title: "Meses",
                valueFormatString: "MMM",
            },
            axisY: {
                title: categoryType + " (em €)",
                minimum: Math.min(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez) - 100 * categoryInfo.weight,
            },
            data: [{
                type: "spline",
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,### €",
                dataPoints: [
                    { label: "Janeiro", y: jan},
                    { label: "Fevereiro", y: fev},
                    { label: "Março", y: mar},
                    { label: "Abril", y: abr},
                    { label: "Maio", y: mai},
                    { label: "Junho", y: jun},
                    { label: "Julho", y: jul},
                    { label: "Agosto", y: ago},
                    { label: "Setembro", y: set},
                    { label: "Outubro", y: out},
                    { label: "Novembro", y: nov},
                    { label: "Dezembro", y: dez},
                ]
            }]
        },
        thumbnail: {
            exportEnabled: false,
            animationEnabled: true,
            animationDuration: 1750,
            theme: "dark2",
            backgroundColor: "#424242",
            culture: "pt",
            height: 175,
            axisY: {
                minimum: Math.min(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez) - 100 * categoryInfo.weight,
                maximum: Math.max(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez) + 100 * categoryInfo.weight,
                interval: 100 * categoryInfo.weight
            },
            data: [{
                type: "spline",
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,### €",
                dataPoints: [
                    { label: "Jan", y: jan },
                    { label: "Fev", y: fev },
                    { label: "Mar", y: mar },
                    { label: "Abr", y: abr },
                    { label: "Mai", y: mai },
                    { label: "Jun", y: jun },
                    { label: "Jul", y: jul },
                    { label: "Ago", y: ago },
                    { label: "Set", y: set },
                    { label: "Out", y: out },
                    { label: "Nov", y: nov },
                    { label: "Dez", y: dez },
                ]
            }]
        }
    };
}

export function categoriesOnTimeIntervalChartTemplate(title, categoryType, initialDate, finalDate, dataAggregation) {
    return {
        title: title,
        date: new Date().toLocaleDateString('pt', dateOptions),
        chart: {
            exportEnabled: true,
            exportFileName: title.replace(/ /g, ''),
            animationEnabled: true,
            animationDuration: 1250,
            theme: "dark2",
            backgroundColor: "#424242",
            culture: "pt",
            zoomEnabled: true,
            panEnabled: true,
            title: {
                text: title,
                fontFamily: "Helvetica",
                margin: 10
            },
            subtitles:[
                {
                    text: "Desde " + new Date(initialDate).toLocaleDateString('pt', dateOptions),
                    fontColor: "grey",
                    fontSize: 11
                },
                {
                    text: "até " + new Date(finalDate).toLocaleDateString('pt', dateOptions),
                    fontColor: "grey",
                    fontSize: 11,
                    margin: 20
                }
            ],
            legend: {
                fontWeight: "normal",
            },
            data: [{
                type: "pie",
                showInLegend: true,
                fontColor: "#fff",
                indexLabel: "{y}% {label}",
                legendText: "{label}",
                indexLabelFontColor: "white",
                toolTipContent: "{label}: <strong>{y} %</strong>",
                dataPoints: [
                    {label: "Casa", y: 41.9, color: spentCategories.get("Casa").color},
                    {label: "Impostos", y: 5.2, color: spentCategories.get("Impostos").color},
                    {label: "Restauração", y: 5.1, color: spentCategories.get("Restauração").color},
                    {label: "Transporte", y: 14.6, color: spentCategories.get("Transporte").color},
                    {label: "Educação", y: 12.0, color: spentCategories.get("Educação").color},
                    {label: "Saúde", y: 11.0, color: spentCategories.get("Saúde").color},
                    {label: "Férias", y: 4.0, color: spentCategories.get("Férias").color},
                    {label: "Diversão", y: 1.1, color: spentCategories.get("Diversão").color},
                    {label: "Animais de Estimação", y: 5.1, color: spentCategories.get("Animais de Estimação").color}
                ]
            }]
        },
        thumbnail: {
            exportEnabled: false,
            animationEnabled: true,
            animationDuration: 1750,
            theme: "dark2",
            backgroundColor: "#424242",
            culture: "pt",
            height: 175,
            data: [{
                type: "pie",
                showInLegend: false,
                fontColor: "#fff",
                toolTipContent: "{label}: <strong>{y} %</strong>",
                indexLabel: "{y} %",
                indexLabelPlacement: "inside",
                indexLabelFontColor: "white",
                dataPoints: [
                    {label: "Casa", y: 41.9, color: spentCategories.get("Casa").color},
                    {label: "Impostos", y: 5.2, color: spentCategories.get("Impostos").color},
                    {label: "Restauração", y: 5.1, color: spentCategories.get("Restauração").color},
                    {label: "Transporte", y: 14.6, color: spentCategories.get("Transporte").color},
                    {label: "Educação", y: 12.0, color: spentCategories.get("Educação").color},
                    {label: "Saúde", y: 11.0, color: spentCategories.get("Saúde").color},
                    {label: "Férias", y: 4.0, color: spentCategories.get("Férias").color},
                    {label: "Diversão", y: 1.1, color: spentCategories.get("Diversão").color},
                    {label: "Animais de Estimação", y: 5.1, color: spentCategories.get("Animais de Estimação").color}
                ]
            }]
        }
    }
}

export function distinctTimeIntervalChartTemplate(title, categoryType,
                                                  firstInitialDate, firstFinalDate,
                                                  secondInitialDate, secondFinalDate, dataAggregation) {
    let seg1 = randomIntFromInterval(40, 60);
    let ter1 = randomIntFromInterval(30, 50);
    let qua1 = randomIntFromInterval(30, 50);
    let qui1 = randomIntFromInterval(45, 60);
    let sex1 = randomIntFromInterval(30, 75);
    let sab1 = randomIntFromInterval(40, 55);
    let dom1 = randomIntFromInterval(30, 55);

    let seg2 = randomIntFromInterval(40, 60);
    let ter2 = randomIntFromInterval(35, 50);
    let qua2 = randomIntFromInterval(30, 40);
    let qui2 = randomIntFromInterval(45, 60);
    let sex2 = randomIntFromInterval(35, 70);
    let sab2 = randomIntFromInterval(40, 55);
    let dom2 = randomIntFromInterval(30, 55);
    return {
        title: title,
        date: new Date().toLocaleDateString('pt', dateOptions),
        chart: {
            exportEnabled: true,
            exportFileName: title.replace(/ /g, ''),
            animationEnabled: true,
            animationDuration: 1250,
            theme: "dark2",
            backgroundColor: "#424242",
            culture: "pt",
            zoomEnabled: true,
            panEnabled: true,
            title: {
                text: title,
                fontFamily: "Helvetica",
                margin: 10
            },
            subtitles:[
                {
                    text: "Desde " + new Date(firstInitialDate).toLocaleDateString('pt', dateOptions) +
                        " até " + new Date(firstFinalDate).toLocaleDateString('pt', dateOptions),
                    fontColor: "grey",
                    fontSize: 11
                },
                {
                    text: "Desde " + new Date(secondInitialDate).toLocaleDateString('pt', dateOptions) +
                        " até " + new Date(secondFinalDate).toLocaleDateString('pt', dateOptions),
                    fontColor: "grey",
                    fontSize: 11,
                    margin: 20
                }
            ],
            toolTip: {
                shared: true,
            },
            axisY : {
                title: categoryType + " (€)",
                minimum: Math.min(seg1, ter1, qua1, qui1, sex1, sab1, dom1, seg2, ter2, qua2, qui2, sex2, sab2, dom2) - 10
            },
            ticks: {
                title: "Semanas",
                autoSkip: false
            },
            data: [
                {
                    type: "spline",
                    name: "1ª semana novembro",
                    showInLegend: true,
                    xValueFormatString: "MMM YYYY",
                    yValueFormatString: "#,### €",
                    dataPoints: [
                        { label: "Segunda", y: seg1},
                        { label: "Terça", y: ter1},
                        { label: "Quarta", y: qua1},
                        { label: "Quinta", y: qui1},
                        { label: "Sexta", y: sex1},
                        { label: "Sábado", y: sab1},
                        { label: "Domingo", y: dom1},
                    ]
                },
                {
                    type: "spline",
                    name: "2ª semana novembro",
                    showInLegend: true,
                    xValueFormatString: "MMM YYYY",
                    yValueFormatString: "#,### €",
                    dataPoints: [
                        { label: "Segunda", y: seg2},
                        { label: "Terça", y: ter2},
                        { label: "Quarta", y: qua2},
                        { label: "Quinta", y: qui2},
                        { label: "Sexta", y: sex2},
                        { label: "Sábado", y: sab2},
                        { label: "Domingo", y: dom2},
                    ]
                }
            ]
        },
        thumbnail: {
            exportEnabled: false,
            animationEnabled: true,
            animationDuration: 1750,
            theme: "dark2",
            backgroundColor: "#424242",
            culture: "pt",
            height: 175,
            axisY: {
                maximum: Math.max(seg1, ter1, qua1, qui1, sex1, sab1, dom1, seg2, ter2, qua2, qui2, sex2, sab2, dom2) + 10,
                minimum: Math.min(seg1, ter1, qua1, qui1, sex1, sab1, dom1, seg2, ter2, qua2, qui2, sex2, sab2, dom2) - 10,
                interval: 5,
            },
            toolTip: {
                shared: true
            },
            data: [
                {
                    type: "spline",
                    name: "1ª semana novembro",
                    xValueFormatString: "MMM YYYY",
                    yValueFormatString: "#,### €",
                    dataPoints: [
                        { label: "Segunda", y: seg1},
                        { label: "Terça", y: ter1},
                        { label: "Quarta", y: qua1},
                        { label: "Quinta", y: qui1},
                        { label: "Sexta", y: sex1},
                        { label: "Sábado", y: sab1},
                        { label: "Domingo", y: dom1},
                    ]
                },
                {
                    type: "spline",
                    name: "2ª semana novembro",
                    xValueFormatString: "MMM YYYY",
                    yValueFormatString: "#,### €",
                    dataPoints: [
                        { label: "Segunda", y: seg2},
                        { label: "Terça", y: ter2},
                        { label: "Quarta", y: qua2},
                        { label: "Quinta", y: qui2},
                        { label: "Sexta", y: sex2},
                        { label: "Sábado", y: sab2},
                        { label: "Domingo", y: dom2},
                    ]
                }
            ]
        }
    }
}

export const charts = [
    spendings2018, monthlySpending2017, spendingsMarch2018, gainingsComparation20162017
];
