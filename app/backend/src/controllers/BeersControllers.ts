import { Request, Response } from 'express';
import IBeersService from '../interfaces/IService';
import { IBeers } from '../interfaces/IBeers';

export default class BeersController {
  constructor(private service: IBeersService<IBeers>) { }

  public async create(
    req: Request,
    res: Response,
  ) {
    try {
      const beer = req.body;
      const objcreate = await this.service.create(beer);
      return res.status(201).json({ message: objcreate });
    } catch (err) {
      return res.status(400)
        .json({ message: err.message });
    }
  }

  public async readAll(
    _req: Request,
    res: Response,
  ) {
    const customers = await this.service.readAll();
    return res.status(200).json(customers);
  }

  public async update(
    req: Request,
    res: Response,
  ) {
    try {
      const obj = req.body;
      const { id } = obj;
      const beer = await this.service.update(id, obj);
      return res.status(200).json(beer);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}
