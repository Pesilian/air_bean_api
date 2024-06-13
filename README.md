# air_bean_api

Individuellt projekt i kursen backend med Node.js för Lina Persson Signell YHFE23

# Base URL and authorization:

![Base URL and authorization](images/baseUrlAndToken.png)

## /info

Detta anrop används för att hämta information om Air Bean. Anropet skickas som en GET-förfrågan. Om anropet lyckas returneras information om Air Bean.

### URL:

![Info url](images/info.png.png)

## /users/register

Detta anrop används för att registrera användare. Anropen skickas som POST-förfrågan. Man kan lägga upp vanliga användare och admin, men för att lägga upp adminanvändare måste man vara inloggad admin.

### URL:

![Url to register user](images/registerUserBodyUrl.png)

### URL Admin:

Detta kräver autentisering.

![Url to register admin](images/registerAdminBodyUrl.png)

## /users/login

Detta anrop används för att logga in användare. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse samt en token som används som autentisering.

![Url to register admin](images/loginBodyUrl.png)

## /users/:userId

Detta anrop används för att se användarhistorik för en specifik användare. Anropen skickas som GET-förfrågan. OM anropet lyckas returneras vald användare orderhistorik.

### URL:

![Order History](images/userHistory.png)

## products

Detta anrop används för att visa produktkatalog samt lägga till produkter. Anropen skickas som GET rep POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL GET:

![Product catalog](images/getProductCatalog.png)

### URL POST:

![Add product](images/addProductsBodyUrl.png)

## /products/:itemId

Detta anrop används för att redigera en product. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Edit product](images/editProduktBodyUrl.png)

## /campaign

Detta anrop används för lägga till en kampanj. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Start Campaign](images/startCampaign.png)

## campain/:campaignId

Detta anrop används för lägga till varor en kampanj. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Ad Campaign products](images/addCampaignProduct.png)

## /campain/:campaignTitle

Detta anrop används för att ta bort en kampanj. Anropen skickas som DELETE-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Delete Campaign](images/deleteCampaign.png)

## /carts/

Detta anrop används för att starta upp en ny kundvagn. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![New Cart](images/newCart.png)

## /carts/:cartId

Detta anrop används för att visa varukorgen. Anropen skickas som GET-förfrågan. OM anropet lyckas returneras varukorgen.

### URL:

![New Cart](images/viewCart.png)

## /carts/:cartId

Detta anrop används för att lägga till produkter i varukorgen. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Add product to cart](images/addProductCartBodyUrl.png)

## /carts/:cartId/items/:productId

Detta anrop används för att ta bort produkter i varukorgen. Anropen skickas som DELETE-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Remove item from cart](images/deleteProdCart.png)

## /order/:cartId

Detta anrop används för lägga order som användare. Kräver autentisering med token. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Order as user](images/orderAsUser.png)

## /order/:cartId/guest

Detta anrop används för lägga order som gäst. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Order as user](images/orderAsGuest.png)

## /order/:orderId

Detta anrop används för kontrollera status på en order. Anropen skickas som POST-förfrågan. OM anropet lyckas returneras bekräftelse.

### URL:

![Order as user](images/orderStatus.png)

### Security

All endpoints that require authentication use JWT (JSON Web Token) to secure the API

. Send the JWT token in the Authorization header with each request that requires authentication.
