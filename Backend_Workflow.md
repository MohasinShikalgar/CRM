# CRM Project Backend Workflow Documentation

This document explains the overall architecture, folder structure, and data flow of your CRM backend. It is designed to help you understand how a request from the frontend travels through the backend code and interacts with the database.

## 1. Project Folder Structure (Backend)

The backend is built using **Java Spring Boot**. It follows a standard **Layered Architecture**, which separates concerns into different folders. You can find these folders under:
`d:\root\CRM\backend\src\main\java\com\example\demo`

Here is what each package/folder does:

- **`controller/`**: The entry point for frontend HTTP requests (REST API). Controllers map URLs (like `/api/deals`) to Java methods. They receive data from the frontend and pass it down to the Service layer.
- **`service/`**: The "Business Logic" layer. Services contain the core rules of your application (e.g., automatically setting the `createdDate` or calculating revenue). They take instructions from the Controller and manipulate data before talking to the Repository.
- **`repository/`**: The data access layer. Repositories are interfaces extending Spring Data JPA (like `JpaRepository`). They handle all the direct queries to the PostgreSQL database (Create, Read, Update, Delete) without needing manual SQL queries.
- **`entity/`**: The "Model" layer. Entities are simple Java classes mapping directly to tables in your PostgreSQL database (e.g., the `Campaign` class maps to the `campaigns` table).
- **`security/`**: Contains the JWT authentication filters, configuration, and user details services that verify login tokens before a request reaches the controller.
- **`config/`**: Contains configuration classes, most notably `SecurityConfig.java`, which defines which endpoints are public and which require specific roles (like ADMIN, SALES, SUPPORT).

---

## 2. How Data Flows Through the Backend

To understand the workflow, let's trace a typical **Create** request (e.g., Creating a new "Ad Tracking" record).

### Step 1: The Request arrives at the Controller
When the React frontend makes a `POST` request to `/api/ads/{campaignId}`, the `AdTrackingController` catches it.

```java
// Inside AdTrackingController.java
@PostMapping("/{campaignId}")
public AdTracking createAd(@PathVariable Long campaignId, @RequestBody AdTracking ad) {
    // 1. Controller receives the URL variables and JSON body
    // 2. It immediately hands the work off to the Service layer
    return service.createAd(campaignId, ad);
}
```
**Why do this?** Controllers should be kept as "thin" as possible. They only care about HTTP routes and mapping JSON to Java objects.

### Step 2: The Logic is processed in the Service
The `AdTrackingService` takes over. This is where business rules are applied.

```java
// Inside AdTrackingService.java
public AdTracking createAd(Long campaignId, AdTracking ad){
    // 1. Fetch the related Campaign from the database
    Campaign campaign = campaignRepo.findById(campaignId)
            .orElseThrow(() -> new RuntimeException("Campaign not found"));

    // 2. Apply business logic (link the campaign, auto-set the current date)
    ad.setCampaign(campaign);
    ad.setCreatedDate(LocalDate.now());

    // 3. Pass the final object to the Repository to save to the database
    return adRepo.save(ad);
}
```
**Why do this?** The Service layer ensures your database relationships are correct and your data is prepared before saving. 

### Step 3: The Repository talks to the Database
The `AdTrackingRepository` takes the `ad` object and translates the `.save(ad)` command into a `INSERT INTO ad_tracking ...` SQL query behind the scenes.

```java
// Inside AdTrackingRepository.java
public interface AdTrackingRepository extends JpaRepository<AdTracking, Long> {
    // Spring Boot automatically generates the CRUD SQL queries here!
}
```

### Step 4: Data returned to Frontend
Once the row is saved in the PostgreSQL database, the Repository returns the saved Entity (now containing its generated `id`). 
The **Service** returns it to the **Controller**, and the **Controller** automatically converts it back to JSON and sends it back to the React frontend as an HTTP 200 OK response.

---

## 3. Module Breakdown

Here are the main modules flowing through your system:

| Module | Controller | Service | Purpose |
| ------ | ---------- | ------- | ------- |
| **Authentication** | `AuthController` | `UserService` | Handles Login, Registration, and issuing JWT tokens. |
| **Leads** | `LeadController` | `LeadService` | CRM Leads pipeline management. |
| **Customers** | `CustomerController` | `CustomerService` | Paying customer tracking. |
| **Deals** | `DealController` | `DealService` | Sales tracking, connecting Users to Customers. |
| **Interactions** | `InteractionController` | `InteractionService` & `EmailService` | Logging emails and calls, with actual outward SMTP email sending logic. |
| **Tickets** | `TicketController` | `TicketService` | Support ticketing system. |
| **Campaigns** | `CampaignController` | `CampaignService` | Marketing campaigns management. |
| **Ad Tracking** | `AdTrackingController` | `AdTrackingService` | Tracking ad metrics (clicks, impressions, leads) tied to Campaigns. |
| **Tasks** | `TaskController` | `TaskService` | To-Do list management. |
| **Dashboard** | `DashboardController` | `DashboardService` | Aggregates data across modules to return live widget stats for the UI. |

## 4. Summary

Whenever you want to add a new feature or endpoint, follow this strict flow:
1. Define the database shape in the **`entity`**.
2. Create standard queries in the **`repository`**.
3. Write the business logic and computations in the **`service`**.
4. Expose the endpoint to the web in the **`controller`**.
