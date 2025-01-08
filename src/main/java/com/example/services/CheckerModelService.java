package com.example.services;

public class CheckerModelService {
    //TODO change point checking equasion
    public boolean calculate(Float x, Float y, Float r){

        if (x <= 0 && y <= 0)
            return false;
        if ((x <= 0 && y >= 0) && x * x + y * y > (r / 2) * (r / 2))
            return false;
        if ((x >= 0 && y >= 0) && x > r/2 || y > r)
            return false;
        if ((x >= 0 && y <= 0) && x - y > r / 2)
            return false;

        return true;
    }
}
