import Client from '../models/Client';

class ClientController {
  async store(req, res) {
    const { id, name, email, status } = await Client.create(req.body);

    return res.status(200).json({
      id,
      email,
      name,
      status,
    });
  }

  async show(req, res) {
    const client = Client.findByPk(req.params.id);

    return res.status(200).json(client);
  }

  async update(req, res) {
    const client = await Client.findByPk(req.params.id);

    const { id, name, email, status } = await client.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      status,
    });
  }
}

export default new ClientController();
