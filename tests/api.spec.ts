import { test, expect } from '@playwright/test'
import exp from 'constants'
import { request } from 'http'

test.describe.parallel("API Testing", () => {
 const baseURL= "https://reqres.in/api"   
    test("Simple API Test - Assert Response status", async ({request}) => {
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

    test("GET Request - Get User Detail ", async ({request }) => {
        const response = await request.get(`${baseURL}/users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
            //espera o data.id = 1
            expect(responseBody.data.id).toBe(1)
                expect(responseBody.data.first_name).toBe('George')
                expect(responseBody.data.last_name).toBe('Bluth')
                expect(responseBody.data.email).toBeTruthy()
               // console.log(responseBody)

    })

    test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post (`${baseURL}/user`, {
            data: {
                id: 1000, 
            }
        })
            const responseBody = JSON.parse(await response.text())
            expect(responseBody.id).toBe(1000)
            expect(responseBody.createdAt).toBeTruthy()
            console.log(responseBody)
    })


})