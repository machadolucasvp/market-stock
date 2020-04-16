import Client from '../models/Client';

class ClientController {
  async store(req, res) {
    try {
      const { id, name, email, status } = await Client.create(req.body);
      return res.status(200).json({
        id,
        email,
        name,
        status,
      });
    } catch (err) {
      return res.status(400).send();
    }
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
