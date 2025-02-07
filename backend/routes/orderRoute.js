import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { listOrders, placeOrder, userOrder, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userOrders", authMiddleWare, userOrder)


//admin route
orderRouter.get("/list", listOrders)




export default orderRouter;