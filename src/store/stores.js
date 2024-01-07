import { writable } from 'svelte/store';

export const ActiveTab = writable('dashboard');
export const checkDetail = writable(false)
export const Detail = writable();
export const isLocation = writable(false);
export const notifications = writable([]);
export const vehicles = writable([
    {
        id: 1,
        name: "ferocious z1",
        status: "insured",
        type: "auto",
        insuredAmount: 23,
        period: '10 months',
        crashes: 5,
        autoCost: 230,
        imgUrl: '../static/dodge.png'
    },
    {
        id: 2,
        name: "blaze BZ-500",
        status: "uninsured",
        type: "motorcycle",
        crashes: 6,
        autoCost: 200,
        costOfInsurance: 20,
        imgUrl: '../static/acura.png'
    },
    {
        id: 3,
        name: "ferocious z1",
        status: "insured",
        type: "auto",
        insuredAmount: 0,
        period: '3 months',
        crashes: 2,
        autoCost: 145,
        imgUrl: '../static/chevrolet.png'
    },
])
export const destroyedVehicles =  writable([
    {
        id: 1,
        name: "ferocious z1",
        status: "insured",
        type: "auto",
        insuredAmount: 0,
        period: '',
        crashes: 0,
        autoCost: 0,
        destroyed: true,
        imgUrl: '../static/dodge.png'
    },
    {
        id: 2,
        name: "blaze BZ-500",
        status: "uninsured",
        type: "motorcycle",
        crashes: 0,
        autoCost: 0,
        destroyed: true,
        costOfInsurance: 20,
        imgUrl: '../static/acura.png'
    },
])