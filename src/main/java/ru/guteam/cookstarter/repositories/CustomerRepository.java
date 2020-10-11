package ru.guteam.cookstarter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ru.guteam.cookstarter.entities.Customer;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long>, JpaSpecificationExecutor<Customer> {
    Optional<Customer> findByLogin(String login);

    @Override
    <S extends Customer> S saveAndFlush(S s);
}
