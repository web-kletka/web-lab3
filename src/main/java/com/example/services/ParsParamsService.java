package com.example.services;

import lombok.Getter;

import java.util.HashMap;

@Getter
public class ParsParamsService {
    private Float x = null;
    private Float y = null;
    private Float r = null;

    public ParsParamsService(){
    }

    public void pars(String x, String y, String r) {
        pars(new HashMap<>() {{
            put("x", x);
            put("y", y);
            put("r", r);
        }});
    }


    private void pars(HashMap<String, String> map){

        for (String key : map.keySet()) {
            switch (key) {
                case "x" -> x = Float.parseFloat(map.get(key));
                case "y" -> y = Float.parseFloat(map.get(key));
                case "r" -> r = Float.parseFloat(map.get(key));
            }
        }
    }

    public void validParams() throws IllegalArgumentException{
        if (x == null) throw new IllegalArgumentException("x is empty");
        if (y == null) throw new IllegalArgumentException("y is empty");
        if (r == null) throw new IllegalArgumentException("r is empty");
        if (-4.0 > x || x > 4.0) throw new IllegalArgumentException("x must be between -4 and 4");
        if (-3.0 > y || y > 3.0) throw new IllegalArgumentException("y must be between -3 and 3");
        if (1 > r || r > 5) throw new IllegalArgumentException("r must be between 1 and 5");
    }

}
