import { Router } from 'express';
import projectRouter from './project/routes';
import galleryRouter from './gallery/routes';
import {
  teamCrud,
  testimonialCrud,
  partnerCrud,
  faqCrud,
  awardCrud,
  locationCrud,
  donorCrud,
  volunteerCrud,
  beneficiaryCrud,
  departmentCrud,
  accountCrud,
  transactionCrud,
  employeeCrud,
} from './simple/index';
import {
  eventCrud,
  campaignCrud,
  blogCrud,
  blogCategoryCrud,
  documentCrud,
  documentCategoryCrud,
} from './simple/slugged';

const router = Router();

router.use('/projects', projectRouter);
router.use('/galleries', galleryRouter);

router.use('/team', teamCrud.router);
router.use('/testimonials', testimonialCrud.router);
router.use('/partners', partnerCrud.router);
router.use('/faqs', faqCrud.router);
router.use('/awards', awardCrud.router);
router.use('/locations', locationCrud.router);
router.use('/donors', donorCrud.router);
router.use('/volunteers', volunteerCrud.router);
router.use('/beneficiaries', beneficiaryCrud.router);
router.use('/departments', departmentCrud.router);
router.use('/accounts', accountCrud.router);
router.use('/transactions', transactionCrud.router);
router.use('/employees', employeeCrud.router);

router.use('/events', eventCrud.router);
router.use('/campaigns', campaignCrud.router);
router.use('/blogs', blogCrud.router);
router.use('/blog-categories', blogCategoryCrud.router);
router.use('/documents', documentCrud.router);
router.use('/document-categories', documentCategoryCrud.router);

export default router;
