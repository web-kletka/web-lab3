package com.example.beans;

import com.example.services.CheckerModelService;
import com.example.services.EntityModelService;
import com.example.services.ParsParamsService;
import com.example.data.common.customException.ValidException;
import com.example.data.models.MyEntityModel;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Named("CheckerBean")
@SessionScoped
public class CheckerBean implements Serializable {

    @Getter
    @Setter
    private String result = "Не было точек на обработку";

    private final EntityModelService entityModelService = new EntityModelService();
    private final CheckerModelService checkerModelService = new CheckerModelService();
    private final ParsParamsService parsParamsService = new ParsParamsService();

    public void check(String x, String y, String z, String r) {
        long startTime = System.currentTimeMillis();
        try {
            parsParamsService.pars(x, y, z, r);
            parsParamsService.validParams();
            boolean resultOfCalc = checkerModelService.calculate(parsParamsService.getX(), parsParamsService.getY(), parsParamsService.getZ(), parsParamsService.getR());
            MyEntityModel myEntityModel = new MyEntityModel(0, parsParamsService.getX(), parsParamsService.getY(), parsParamsService.getZ(), parsParamsService.getR(), resultOfCalc, System.currentTimeMillis() - startTime, new Date(), "ok");
            result = myEntityModel.toString();
            entityModelService.saveModel(myEntityModel);
        } catch (ValidException e) {
            result = e.getMessage();
        }
    }
}
