
# NASA Mission Control 

This a Project built with NodeJs (Express) as the API service. It makes use of the MVC protocols. 
Where Models are modules seperated from the Routes and controllers. 

Controllers and Routes are placed side by side in Dirs which are binding to a specific functionality.


# API Service 
API service is deployed on AWS using EC2 instance. The codebase was used to create a Docker Image with was then deployed on a free tier EC2 instance. 


This can be seen at 
http://34.229.140.28:8000/

the endpoints include. 

All habitable : http://34.229.140.28:8000/v1/Planets


All Launch Data available: http://34.229.140.28:8000/v1/Launches {GET}

same endpoint to create launch data {POST}

Delete From Launch (actually an edit): http://34.229.140.28:8000/v1/Launches/:Id {DELETE}
# Stack

* NodeJs (JavaScript Runtime ): Layered with Express Framework. 
* Kepler Planet CSV as a source Data. 

* Frontend React Application.


# NASA Mission Control Architecture

This is a flow diagram that shows the interdepency of the stacks. Please vist the link below to see it,

 https://lucid.app/lucidchart/01bf361d-b688-4a7d-8545-20895004dd80/edit?invitationId=inv_3077904d-486e-41cd-8fdb-2c17ecaa672c


 # ZTM Node Project
 