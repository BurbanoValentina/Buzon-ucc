INSERT INTO administrator_account (username, password_hash, security_answer_hash, failed_attempts)
VALUES ('administrator2026-1', '$2a$10$8pfbSfVaSV4ObXFSapUki.CHGP1K1PRLgOQSReupDXQ8pBGE7vv5e', '$2a$10$3c6vfZKpxLQg9zZSRkWmlux9SL9efnLab7LY5Rsi5zVF.Vdb.V1mi', 0)
ON CONFLICT (username) DO NOTHING;
