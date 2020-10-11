package ru.guteam.cookstarter.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
@Data
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnore //todo удалить  - временная запись
    @JoinColumn(name = "customerid")
    private Customer customer;

    @Column(name = "authority")
    private String authority;

    public void setAuthority(String authority) {
        this.authority = authority;
    }

}
