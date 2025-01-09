package com.example.services;

public class CheckerModelService {
    //TODO change point checking equasion
    public boolean calculate(Float x, Float y, Float r){

        if (x <= 0 && y <= 0)
            return false;
        if ((x <= 0 && y >= 0) && x * x + y * y > r * r)
            return false;
        if ((x >= 0 && y >= 0) && x > r || y > r)
            return false;
        if ((x >= 0 && y <= 0) && x - y * 2 > r)
            return false;

        return true;
    }
}
