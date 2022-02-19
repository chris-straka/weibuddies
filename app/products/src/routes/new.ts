import { requireAuth, validateRequest } from "@weibuddies/common"
import { ProductCreatedPublisher } from '../events/publishers/ProductCreatedPublisher'
import { Router, Request, Response } from "express"