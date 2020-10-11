package ru.guteam.cookstarter.controllers.APIv1;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.guteam.cookstarter.configurations.JwtTokenUtil;
import ru.guteam.cookstarter.entities.Customer;
import ru.guteam.cookstarter.entities.dto.JwtRequest;
import ru.guteam.cookstarter.entities.dto.JwtResponse;
import ru.guteam.cookstarter.services.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/login")
public class LoginControllerApiV1 {

    private final CustomerService customerService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    public LoginControllerApiV1(CustomerService customerService, JwtTokenUtil jwtTokenUtil, AuthenticationManager authenticationManager) {
        this.customerService = customerService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping
    public List<Customer> findAllCustomers() {
        return customerService.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) throws Exception {
        try {
            authenticate(authRequest.getUsername(), authRequest.getPassword());
        } catch (BadCredentialsException ex) {
            throw new Exception("Incorrect username or password", ex);
        }

        UserDetails userDetails = customerService.loadUserByUsername(authRequest.getUsername());

        String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }

}
