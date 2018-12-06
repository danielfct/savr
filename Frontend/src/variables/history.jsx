import {AttachMoneyOutlined, FlightOutlined, HomeOutlined, RestaurantOutlined} from "@material-ui/icons";

export const DESPESA = 0;
export const RECEITA = 1;

export const history = [
    {
        id: 5,
        type: RECEITA,
        icon: AttachMoneyOutlined,
        category: "Salário",
        amount: 1063,
        message: "1063 € recebidos",
        date: new Date("12/02/2018"),
        description: "Salário mensal.",
    },
    {
        id: 4,
        type: DESPESA,
        icon: RestaurantOutlined,
        category: "Restauração",
        amount: 45,
        message: "45 € gastos",
        date: new Date("11/20/2018"),
        description: "Almoço com amigos.",
    },
    {
        id: 3,
        type: DESPESA,
        icon: HomeOutlined,
        category: "Casa",
        amount: 126.30,
        message: "126.30 € gastos",
        date: new Date("11/13/2018"),
        description: "Compras domésticas.",
    },
    {
        id: 2,
        type: RECEITA,
        icon: AttachMoneyOutlined,
        category: "Salário",
        amount: 1045,
        message: "1045 € recebidos",
        date: new Date("11/06/2018"),
        description: "Salário mensal.",
    },
    {
        id: 1,
        type: DESPESA,
        icon: FlightOutlined,
        category: "Férias",
        amount: 652,
        message: "652 € gastos",
        date: new Date("12/27/2017"),
        description: "Viagem de férias à Austrália.",
    },
];
