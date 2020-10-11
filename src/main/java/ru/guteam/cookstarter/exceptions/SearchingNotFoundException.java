package ru.guteam.cookstarter.exceptions;

public class SearchingNotFoundException extends RuntimeException {
    public SearchingNotFoundException(String message) {
        super(message);
    }
}
