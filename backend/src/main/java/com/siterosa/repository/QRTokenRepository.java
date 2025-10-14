package com.siterosa.repository;

import com.siterosa.entity.QRToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QRTokenRepository extends JpaRepository<QRToken, Long> {
    Optional<QRToken> findByToken(String token);
}