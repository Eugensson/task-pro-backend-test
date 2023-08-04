
/**
 * @swagger
 * /api/email/send-help-request:
 *   post:
 *     summary: Відправити запит на допомогу
 *     tags:
 *       - Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HelpRequest'
 *     responses:
 *       200:
 *         description: Успішно відправлено
 *       400:
 *         description: Помилка валідації
 *       500:
 *         description: Помилка сервера
 */