import { Router, type IRouter } from "express";
import healthRouter from "./health";
import stripeRouter from "./stripe";
import orderRouter from "./order";

const router: IRouter = Router();

router.use(healthRouter);
router.use('/stripe', stripeRouter);
router.use(orderRouter);

export default router;
