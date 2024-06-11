# air_bean_api

Individuellt projekt i kursen backend med Node.js för Lina Persson Signell YHFE23

# Base URL:

http://localhost:8000

## Info:

Detta anrop används för att hämta information om Air Bean. Anropet skickas som en GET-förfrågan. Om anropet lyckas returneras information om Air Bean.

## URL:

![Alt text](images/.png)

## USERS/register

Detta anrop används för att registrera användare. Anropen skickas som POST-förfrågan. Man kan lägga upp vanliga användare och admin, men för att lägga upp adminanvändare måste man vara inloggad admin.

### URL användare:

### URL Admin:

## USERS/login

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## USERS/:userId

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## PRODUCTS

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## PRODUCTS/item

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## PRODUCTS/campain

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## CARTS/

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## CARTS/:cartId

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## ORDERS/login

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## ORDERS/login

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

## ORDERS/login

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

### URL:

### Security

All endpoints that require authentication use JWT (JSON Web Token) to secure the API

. Send the JWT token in the Authorization header with each request that requires authentication.
