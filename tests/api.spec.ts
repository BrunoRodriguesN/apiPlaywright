import { test, expect } from '@playwright/test'
import { request } from 'http'

test.describe.parallel("API Testing", () => {
 const baseURL= "https://reqres.in/api"   
    test.only("Simple API Test - Assert Response status", async ({request}) => {
        const response = await request.get(`${baseURL}/users/2`)
        // espera o resultado 200
        expect (response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({request}) => {
        const response = await request.get(`${baseURL}/users/non-existing-endpoint`)
        // espera o resultado 404
        expect (response.status()).toBe(404)
    })


})