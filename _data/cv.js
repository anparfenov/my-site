module.exports = {
    ru: {
        name: "Андрей Парфенов",
        profession: "Разработчик интерфейсов",
        contacts: [
            {
                icon: "brand-telegram",
                link: "https://t.me/rawkangaroo",
                name: "telegram",
            },
            {
                icon: "at",
                link: "mailto:asleeppiano@outlook.com",
                name: "asleeppiano@outlook.com",
            },
        ],
        skills: [
            {
                section: "Языки программирования",
                tech: [
                    { name: "javascript", classList: "c-lang c-lang--js" },
                    { name: "typescript", classList: "c-lang c-lang--ts" },
                    { name: "html", classList: "c-lang c-lang--html" },
                    { name: "css", classList: "c-lang c-lang--css" },
                ],
            },
            {
                section: "Фреймворки",
                tech: [
                    { name: "vue", classList: "c-lang c-lang--vue", desc: "использую на текущей работе" },
                    { name: "svelte", classList: "c-lang c-lang--svelte" },
                    { name: "react", classList: "c-lang c-lang--react" },
                ],
            },
            {
                section: "Остальное",
                list: [
                    "git, docker",
                    "знаком c c, c++, java, clojure",
                ],
            },
        ],
        jobs: [
            {
                company: "Кошелек",
                class: "koshelek",
                start: new Date("2020-09-14"),
                description: [
                    { text: 'Разработка vue компонентов' },
                    { text: 'Работа с ssr, микросервисной архитектурой, webpack module federation' },
                    { text: 'Написание unit/e2e тестов для vue компонентов' },
                    { text: 'Сделал новый раздел на сайте, редактор статей, сервис авторизации' },
                ]
            },
            {
                company: "Розарио",
                class: "rozario",
                start: new Date("2019-11-01"),
                end: new Date("2020-07-01"),
                description: [
                    { text: 'Разработка компонентов на svelte' },
                    { text: 'Написание тестов unit/e2e' },
                    { text: 'Разработал почти все компоненты' },
                    { text: 'Валидация форм' },
                ],
            },
            {
                company: "Фриланс",
                class: "freelance",
                start: new Date("2019-06-01"),
                end: new Date("2019-11-01"),
                description: [
                    { text: 'разработал блог для интернет магазина (react)' },
                    { text: 'верстка html/css, скрипты на js, react.' },
                ],
            },
            {
                company: "Севентест",
                class: "seventest",
                start: new Date("2017-08-01"),
                end: new Date("2020-01-01"),
                description: [
                    { text: 'разрботка системы мониторинга сетей на с++' },
                ],
            },
        ],
        educationlist: [
            {
                university: "СПБГУТ",
                class: "sut",
                image: "",
                start: new Date("2014-09-01"),
                end: new Date("2014-06-29"),
                faculty: "ИКСС",
                program: "Программная инженерия",
            },
        ],
        heading: {
            skills: "Навыки",
            "jobExperience": "Опыт работы",
            "education": "Образование",
        },
        text: {
            "currentTime": "текущее время",
            "noResume": "Резюме нет",
        }
    },
};
