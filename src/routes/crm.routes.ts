import { Router } from "express";

const routeCRM = Router();

import crmControllers from "../controllers/crm.controllers";

import { isAuthenticated } from "../middlewares/auth";
import { validationRestInfo } from "../middlewares/restInfo";

//Stored procedure
routeCRM.get("/sp/addr-district/:provinceName", [isAuthenticated, validationRestInfo], crmControllers.AddrDistrict)
routeCRM.get("/sp/addr-province/", [isAuthenticated, validationRestInfo], crmControllers.AddrProvince)
routeCRM.get("/sp/check-existed-line-id/:lineId", [isAuthenticated, validationRestInfo], crmControllers.CheckExistedLineID)
routeCRM.get("/sp/check-existed-line-id/:lineId", [isAuthenticated, validationRestInfo], crmControllers.CheckExistedLineID)
routeCRM.get("/sp/check-existed-tel-no", [isAuthenticated, validationRestInfo], crmControllers.CheckExistedTelNo)
routeCRM.get("/sp/check-otp", [isAuthenticated, validationRestInfo], crmControllers.CheckOTP)
routeCRM.get("/sp/check-shop-id/:shopId", [isAuthenticated, validationRestInfo], crmControllers.CheckShopID)
routeCRM.get("/sp/exp-point", [isAuthenticated, validationRestInfo], crmControllers.ExpPoint)
routeCRM.post("/sp/insert-coupon-by-mem-card", [isAuthenticated, validationRestInfo], crmControllers.InsertCouponByMemCard)
routeCRM.post("/sp/insert-mem-card", [isAuthenticated, validationRestInfo], crmControllers.InsertMemCard)
routeCRM.post("/sp/insert-otp", [isAuthenticated, validationRestInfo], crmControllers.InsertOTP)
routeCRM.get("/sp/mem-card-check-exists", [isAuthenticated, validationRestInfo], crmControllers.MemCardCheckExists)
routeCRM.get("/sp/promotion-list", [isAuthenticated, validationRestInfo], crmControllers.PromotionList)
routeCRM.get("/sp/select-cash-card/:memCardId", [isAuthenticated, validationRestInfo], crmControllers.SelectCashCard)
routeCRM.get("/sp/select-mem-card/:memCardId", [isAuthenticated, validationRestInfo], crmControllers.SelectMemCard)
routeCRM.get("/sp/shop-banner/:shopCode", [isAuthenticated, validationRestInfo], crmControllers.ShopBanner)
routeCRM.get("/sp/shop-code/:shopCode", [isAuthenticated, validationRestInfo], crmControllers.ShopCode)
routeCRM.get("/sp/shop-cp-type/:shopCode", [isAuthenticated, validationRestInfo], crmControllers.ShopCPType)
routeCRM.get("/sp/trn-point/:memCardId", [isAuthenticated, validationRestInfo], crmControllers.TrnPoint)
routeCRM.put("/sp/update-mem-card", [isAuthenticated, validationRestInfo], crmControllers.UpdateMemCard)
routeCRM.put("/sp/update-mem-card-level", [isAuthenticated, validationRestInfo], crmControllers.UpdateMemCard_Level)

export default routeCRM;