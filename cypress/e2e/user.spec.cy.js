import userData from '../fixtures/users/userData.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/menuPage'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()

describe('Orange HRM Tests', () => {

  const selectorsList = {
    
    firstNameField: "[name='firstName']",
    middleNameField: "[name='middleName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-dd-mm']",
    genericComboBox: ".oxd-select-text--arrow",
    seventhnineItemComboBox: ".oxd-select-dropdown > :nth-child(79)",
    thirdItemComboBox: ".oxd-select-dropdown > :nth-child(3)",
    genderRadio: ".oxd-radio-wrapper",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
    

  }

  it.only('User Info Update - Success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)

    dashboardPage.checkDashboardPage()

    menuPage.accessMyInfo()

    cy.get(selectorsList.firstNameField).clear().type('Phillip')
    cy.get(selectorsList.middleNameField).clear().type('George')
    cy.get(selectorsList.lastNameField).clear().type('Smith')
    cy.get(selectorsList.genericField).eq(3).clear().type('112') // Employee ID
    cy.get(selectorsList.genericField).eq(4).clear().type('9999') // Other ID
    cy.get(selectorsList.genericField).eq(5).clear().type('010101010101') // Driver's License Number
    cy.get(selectorsList.dateField).eq(0).clear().type('2030-09-24') // License Expiry Date
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.genericComboBox).eq(0).click() // Nacionality
    cy.get(selectorsList.seventhnineItemComboBox).click() 
    cy.get(selectorsList.genericComboBox).eq(1).click() // Marital Status
    cy.get(selectorsList.thirdItemComboBox).click()
    cy.get(selectorsList.dateField).eq(1).clear().type('1984-12-17') // Date of Birth
    cy.get(selectorsList.genderRadio).eq(1).click()
    cy.get(selectorsList.submitButton).eq(0).click({ force: true })
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get('.oxd-toast-close')
    
  })

  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})