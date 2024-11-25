package com.example.beans;

import com.example.services.ParsParamsService;
import com.example.data.common.customException.ValidException;
import com.example.data.models.MyEntityModel;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;

@Named("CheckerBean")
@SessionScoped
public class CheckerBean implements Serializable {

    long startTime;
    String result;
    boolean resultOfCalc = false;

    public MyEntityModel getModel(String x, String y, String r) {
        startTime = System.currentTimeMillis();
        try {
            var parsParamsService = new ParsParamsService(new HashMap<>() {{
                put("x", x);
                put("y", y);
                put("r", r);
            }});
            resultOfCalc = calculate(parsParamsService.getX(), parsParamsService.getY(), parsParamsService.getR());

            if (resultOfCalc) result = "Попал";
            else result = "Мимо";
            return new MyEntityModel(0, parsParamsService.getX(), parsParamsService.getY(), parsParamsService.getR(), resultOfCalc, System.currentTimeMillis() - startTime, new Date());
        } catch (
                ValidException e) {
            result = e.getMessage();
            return null;
        }
    }

    private boolean calculate(Float x, Float y, Float r){

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
