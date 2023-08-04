const { transport } = require('../../helpers');

const sendHelpRequest = async (req, res) => {
  const { email, comment } = req.body;

  try {
    const mailOptions = {
      from: 'eco2023@meta.ua',
      to: 'taskpro.project@gmail.com',
      subject: 'Help Request',
      text: `Email: ${email}\nComment: ${comment}`,
    };

    await transport.sendMail(mailOptions);

    res.status(200).json({ message: 'Help request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send help request' });
  }
};

module.exports = sendHelpRequest;
